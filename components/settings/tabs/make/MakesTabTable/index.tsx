import React from "react"
import {Button, Fade, Stack, Typography} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ClearIcon from '@mui/icons-material/Clear';
import {DataGridProps,} from "@mui/x-data-grid";

import {DEFAULT_PAGE_SIZE_OPTIONS} from "core/consts/pagination";
import {Make} from "core/types";
import {CustomDataGrid} from "components/common/wrappers/CustomDataGrid";
import {Page} from "core/types/common";

import NotFound from "public/web-page.png"

interface MakesTabContentProps {
  selection?: Make | null;
  onRefreshClick: (_: React.MouseEvent) => void;
  onUnselectClick: (_: React.MouseEvent) => void;
  rows: Page<Make>;
  columns: DataGridProps['columns'];
  onPaginationChange: DataGridProps['onPaginationModelChange'];
  onSelectionChange: DataGridProps['onRowSelectionModelChange'];
  rowSelectionModel: DataGridProps['rowSelectionModel'];
  paginationModel: DataGridProps['paginationModel'];
}

export const MakesTabTable: React.FC<MakesTabContentProps> = ({
                                                                selection,
                                                                onRefreshClick,
                                                                onUnselectClick,
                                                                rows,
                                                                columns,
                                                                onPaginationChange,
                                                                onSelectionChange,
                                                                rowSelectionModel,
                                                                paginationModel
                                                              }) => {
  return (
    <Stack flex={1} minWidth="400px" spacing={1}>
      <Stack direction="row" alignItems="end">
        <Typography variant="subtitle1" component="span" lineHeight={1} flexGrow={1}>
          Makes that stored in database:
        </Typography>
        <Stack direction="row" spacing={1}>
          <Fade in={!!selection} unmountOnExit>
            <Button variant="contained" startIcon={<ClearIcon/>} size="small" onClick={onUnselectClick}>
              Unselect
            </Button>
          </Fade>
          <Button variant="contained" startIcon={<RefreshIcon/>} size="small" onClick={onRefreshClick}>
            Refresh
          </Button>
        </Stack>
      </Stack>
      <CustomDataGrid
        rows={rows}
        columns={columns}
        onPaginationModelChange={onPaginationChange}
        onRowSelectionModelChange={onSelectionChange}
        rowSelectionModel={rowSelectionModel}
        paginationModel={paginationModel}
        pageSizeOptions={DEFAULT_PAGE_SIZE_OPTIONS}
        noRowsOverlayText="No data found in database"
        noRowsOverlayImage={NotFound}
      />
    </Stack>
  )
}