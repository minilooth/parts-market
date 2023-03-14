import React from "react";
import {Stack} from "@mui/material";
import {useRouter} from "next/router";
import {GridCallbackDetails, GridPaginationModel, GridRowId, GridRowSelectionModel} from "@mui/x-data-grid";
import {toast} from "react-toastify";

import {SettingsTab} from "@components/settings/tabs/wrapper/SettingsTab";
import {GenerationsColumns} from "@core/consts/settings";
import {GenerationsTabTable} from "@components/settings/tabs/generation/GenerationsTabTable";
import {GenerationsTabForm} from "@components/settings/tabs/generation/GenerationsTabForm";
import {InitialPage, InitialPageSize} from "@core/consts/pagination";
import {useMutate} from "@core/hooks/useMutate";
import {Optional} from "@core/types/common";
import {Generation} from "@core/types";
import {DefaultMutateConfiguration, GenerationsSWRKey, MakesSWRKey, ModelsSWRKey} from "@core/consts/swr";
import {PageableUtils} from "@core/utils/pageable";
import {useGenerations} from "@core/hooks/entities/useGenerations";

export const GenerationsTab: React.FC = () => {
  const router = useRouter();

  const page = Number.parseInt(router.query.page as string) || InitialPage;
  const size = Number.parseInt(router.query.size as string) || InitialPageSize;
  const modelId = Number.parseInt(router.query.modelId as string);

  const mutate = useMutate()
  const generations = useGenerations(modelId, {page, size});

  const [selectedIds, setSelectedIds] = React.useState<Array<GridRowId>>([]);
  const selection: Optional<Generation> = generations.content.find(({id}) => id === selectedIds?.[0])

  React.useEffect(() => {
    mutate(GenerationsSWRKey)
      .catch(console.error);
  }, [page, size, modelId, mutate])

  React.useEffect(() => {
    return () => {
      mutate(GenerationsSWRKey, PageableUtils.getEmptyPage(), DefaultMutateConfiguration)
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
    await mutate(MakesSWRKey);
    await mutate(ModelsSWRKey);
    await mutate(GenerationsSWRKey);
  }

  const handleUnselectClick = async (_: React.MouseEvent) => {
    await setSelectedIds([]);
  }

  const handleSaveClick = async (generation: Generation, callback: () => void) => {
    if (selection) {
      toast.success('Generation successfully updated');
    } else {
      toast.success('Generation successfully saved')
    }
    await setSelectedIds([]);
    await mutate(GenerationsSWRKey);
    await callback();
    console.log("SAVE", generation);
  }

  const handleDeleteClick = async (generation: Generation, callback: () => void) => {
    toast.success('Generation successfully deleted')
    await setSelectedIds([]);
    await mutate(GenerationsSWRKey);
    await callback();
    console.log("DELETE", generation)
  }

  return (
    <SettingsTab title="Generations">
      <Stack direction="row" flex={1} spacing={3}>
        <GenerationsTabTable
          selection={selection}
          rows={generations}
          columns={GenerationsColumns}
          paginationModel={{page: page - 1, pageSize: size}}
          rowSelectionModel={selectedIds}
          onRefreshClick={handleRefreshClick}
          onUnselectClick={handleUnselectClick}
          onPaginationChange={handlePaginationChange}
          onSelectionChange={handleRowSelectionChange}
        />
        <GenerationsTabForm
          selection={selection}
          onSave={handleSaveClick}
          onDelete={handleDeleteClick}
        />
      </Stack>
    </SettingsTab>
  )
}