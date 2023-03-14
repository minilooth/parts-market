import React from "react"
import {Stack} from "@mui/material";
import {useRouter} from "next/router";
import {GridCallbackDetails, GridPaginationModel, GridRowId, GridRowSelectionModel} from "@mui/x-data-grid";
import {toast} from "react-toastify";

import {SettingsTab} from "components/settings/tabs/wrapper/SettingsTab";
import {MODELS_COLUMNS} from "core/consts/settings";
import {ModelsTabTable} from "components/settings/tabs/model/ModelsTabTable";
import {ModelsTabForm} from "components/settings/tabs/model/ModelsTabForm";
import {PageableUtils} from "core/utils/pageable";
import {INITIAL_PAGE, INITIAL_PAGE_SIZE} from "core/consts/pagination";
import {useModels} from "core/hooks/useModels";
import {Model} from "core/types";
import {Optional} from "core/types/common";
import {DefaultMutateConfiguration, MakesSWRKey, ModelsSWRKey} from "core/consts/swr";
import {useMutate} from "core/hooks/entities/useMutate";

export const ModelsTab: React.FC = () => {
  const router = useRouter();

  const page = Number.parseInt(router.query.page as string) || INITIAL_PAGE;
  const size = Number.parseInt(router.query.size as string) || INITIAL_PAGE_SIZE;
  const makeId = Number.parseInt(router.query.makeId as string);

  const mutate = useMutate()
  const models = useModels(makeId, {page, size});

  const [selectedIds, setSelectedIds] = React.useState<Array<GridRowId>>([]);
  const selection: Optional<Model> = models.content.find(({ id }) => id === selectedIds?.[0])

  React.useEffect(() => {
    mutate(ModelsSWRKey)
      .catch(console.error);
  }, [page, size, makeId, mutate])

  React.useEffect(() => {
    return () => {
      mutate(ModelsSWRKey, PageableUtils.getEmptyPage(), DefaultMutateConfiguration)
        .catch(console.error)
    }
  }, [mutate])

  const handlePaginationChange = async (pagination: GridPaginationModel, _: GridCallbackDetails) => {
    await router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: pagination.page + 1,
        size: pagination.pageSize
      }
    })
  }

  const handleRowSelectionChange = (selection: GridRowSelectionModel, _: GridCallbackDetails) => {
    setSelectedIds(selection)
  }

  const handleRefreshClick = async (_: React.MouseEvent) => {
    await setSelectedIds([]);
    await mutate(MakesSWRKey)
    await mutate(ModelsSWRKey)
  }

  const handleUnselectClick = async (_: React.MouseEvent) => {
    await setSelectedIds([]);
  }

  const handleSaveClick = async (make: Model, callback: () => void) => {
    if (selection) {
      toast.success('Model successfully updated');
    } else {
      toast.success('Model successfully saved')
    }
    await setSelectedIds([]);
    await mutate(ModelsSWRKey);
    await callback();
    console.log("SAVE", make);
  }

  const handleDeleteClick = async (make: Model, callback: () => void) => {
    toast.success('Model successfully deleted')
    await setSelectedIds([]);
    await mutate(ModelsSWRKey);
    await callback();
    console.log("DELETE", make)
  }

  return (
    <SettingsTab title="Models">
      <Stack direction="row" flex={1} spacing={3}>
        <ModelsTabTable
          selection={selection}
          rows={models}
          columns={MODELS_COLUMNS}
          paginationModel={{page: page - 1, pageSize: size}}
          rowSelectionModel={selectedIds}
          onRefreshClick={handleRefreshClick}
          onUnselectClick={handleUnselectClick}
          onPaginationChange={handlePaginationChange}
          onSelectionChange={handleRowSelectionChange}
        />
        <ModelsTabForm
          selection={selection}
          onSave={handleSaveClick}
          onDelete={handleDeleteClick}
        />
      </Stack>
    </SettingsTab>
  )
}