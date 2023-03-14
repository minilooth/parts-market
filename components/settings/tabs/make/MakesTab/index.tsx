import React from "react";
import {GridCallbackDetails, GridPaginationModel, GridRowId, GridRowSelectionModel} from "@mui/x-data-grid";
import {Stack} from "@mui/material";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

import {MAKES_COLUMNS} from "core/consts/settings";
import {INITIAL_PAGE, INITIAL_PAGE_SIZE} from "core/consts/pagination";
import {SettingsTab} from "components/settings/tabs/wrapper/SettingsTab";
import {MakesTabForm} from "components/settings/tabs/make/MakesTabForm";
import {MakesTabTable} from "components/settings/tabs/make/MakesTabTable";
import {PageableUtils} from "core/utils/pageable";
import {useMakes} from "core/hooks/entities/useMakes";
import {Make} from "core/types";
import {Optional} from "core/types/common";
import {DefaultMutateConfiguration, MakesSWRKey} from "core/consts/swr";
import {useMutate} from "core/hooks/entities/useMutate";

export const MakesTab: React.FC = () => {
  const router = useRouter();

  const page = Number.parseInt(router.query.page as string) || INITIAL_PAGE;
  const size = Number.parseInt(router.query.size as string) || INITIAL_PAGE_SIZE;

  const mutate = useMutate();
  const makes = useMakes({page, size});

  const [selectedIds, setSelectedIds] = React.useState<Array<GridRowId>>([]);
  const selection: Optional<Make> = makes.content.find(({ id }) => id === selectedIds?.[0])

  React.useEffect(() => {
    mutate(MakesSWRKey)
      .catch(console.error)
  }, [page, size, mutate])

  React.useEffect(() => {
    return () => {
      mutate(MakesSWRKey, PageableUtils.getEmptyPage(), DefaultMutateConfiguration)
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
  }

  const handleUnselectClick = async (_: React.MouseEvent) => {
    await setSelectedIds([]);
  }

  const handleSaveClick = async (make: Make, callback: () => void) => {
    if (selection) {
      toast.success('Make successfully updated');
    } else {
      toast.success('Make successfully saved')
    }
    await setSelectedIds([]);
    await mutate(MakesSWRKey);
    await callback();
    console.log("SAVE", make);
  }

  const handleDeleteClick = async (make: Make, callback: () => void) => {
    toast.success('Make successfully deleted')
    await setSelectedIds([]);
    await mutate(MakesSWRKey);
    await callback();
    console.log("DELETE", make)
  }

  return (
    <SettingsTab title="Makes">
      <Stack direction="row" flex={1} spacing={3}>
        <MakesTabTable
          selection={selection}
          rows={makes}
          columns={MAKES_COLUMNS}
          paginationModel={{page: page - 1, pageSize: size}}
          rowSelectionModel={selectedIds}
          onRefreshClick={handleRefreshClick}
          onUnselectClick={handleUnselectClick}
          onPaginationChange={handlePaginationChange}
          onSelectionChange={handleRowSelectionChange}
        />
        <MakesTabForm
          selection={selection}
          onSave={handleSaveClick}
          onDelete={handleDeleteClick}
        />
      </Stack>
    </SettingsTab>
  )
}