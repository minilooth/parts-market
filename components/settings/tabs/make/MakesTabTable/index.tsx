import React from "react"
import {Button, Fade, Stack, Typography} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ClearIcon from '@mui/icons-material/Clear';

import {DefaultPageSizeOptions} from "@core/consts/pagination";
import {Make} from "@core/types";
import {CustomDataGrid} from "@components/common/wrappers/CustomDataGrid";
import {SettingsTabTableProps} from "@core/types/settings";

import NotFound from "@public/web-page.png"

export const MakesTabTable: React.FC<SettingsTabTableProps<Make>> = ({
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
        pageSizeOptions={DefaultPageSizeOptions}
        noRowsOverlayText="No data found in database"
        noRowsOverlayImage={NotFound}
      />
    </Stack>
  )
}