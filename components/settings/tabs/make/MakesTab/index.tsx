import React from "react";
import {GridPaginationModel, GridRowId, GridRowSelectionModel} from "@mui/x-data-grid";
import {Stack} from "@mui/material";
import {useRouter} from "next/router";

import {MAKES_COLUMNS} from "core/consts/settings";
import {INITIAL_PAGE, INITIAL_PAGE_SIZE} from "core/consts/pagination";
import {SettingsTab} from "components/settings/tabs/SettingsTab";
import {MakesTabForm} from "components/settings/tabs/make/MakesTabForm";
import {MakesTabTable} from "components/settings/tabs/make/MakesTabTable";
import {PageableUtils} from "core/utils/pageable";
import {useMakes} from "core/hooks/useMakes";
import {Make} from "core/types/types";

export const MakesTab: React.FC = () => {
  const router = useRouter();

  const page = Number.parseInt(router.query.page as string) || INITIAL_PAGE;
  const size = Number.parseInt(router.query.size as string) || INITIAL_PAGE_SIZE;

  const {data, mutate} = useMakes({page, size}, {revalidateOnMount: false, revalidateOnFocus: false});
  const [selectedRows, setSelectedRows] = React.useState<Array<GridRowId>>([]);

  const selectedMake: Make | undefined = data.content.find((item) => item.id === selectedRows?.[0])

  React.useEffect(() => {
    mutate()
  }, [page, size, mutate])

  React.useEffect(() => {
    return () => {
      mutate(PageableUtils.getEmptyPage())
    }
  }, [mutate])

  const handlePaginationChange = async (pagination: GridPaginationModel) => {
    await router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: pagination.page + 1,
        size: pagination.pageSize
      }
    })
  }

  const handleRowSelectionChange = (selection: GridRowSelectionModel) => {
    setSelectedRows(selection)
  }

  const handleRefreshClick = async () => {
    await mutate();
  }

  const handleUnselectClick = async () => {
    await setSelectedRows([]);
  }

  return (
    <SettingsTab title="Makes">
      <Stack direction="row" height="100%" columnGap={3}>
        <MakesTabTable
          selection={selectedMake}
          rows={data}
          columns={MAKES_COLUMNS}
          paginationModel={{page: page - 1, pageSize: size}}
          rowSelectionModel={selectedRows}
          onRefreshClick={() => handleRefreshClick()}
          onUnselectClick={() => handleUnselectClick()}
          onPaginationChange={(pagination, _) => handlePaginationChange(pagination)}
          onSelectionChange={(selection, _) => handleRowSelectionChange(selection)}
        />
        <MakesTabForm
          selection={selectedMake}
        />
      </Stack>
    </SettingsTab>
  )
}