import React from "react"
import {Button, Fade, Stack, Typography} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import RefreshIcon from "@mui/icons-material/Refresh";
import {CustomDataGrid} from "../../../../common/wrappers/CustomDataGrid";
import {DEFAULT_PAGE_SIZE_OPTIONS} from "../../../../../core/consts/pagination";
import {Model} from "../../../../../core/types/types";
import {Page} from "../../../../../core/types/common";
import {DataGridProps} from "@mui/x-data-grid";

interface ModelsTabContentProps {
  selection?: Model | null;
  onRefreshClick: (_: React.MouseEvent) => void;
  onUnselectClick: (_: React.MouseEvent) => void;
  // rows: Page<Model>;
  // columns: DataGridProps['columns'];
  // onPaginationChange: DataGridProps['onPaginationModelChange'];
  // onSelectionChange: DataGridProps['onRowSelectionModelChange'];
  // rowSelectionModel: DataGridProps['rowSelectionModel'];
  // paginationModel: DataGridProps['paginationModel'];
}

export const ModelsTabTable: React.FC<ModelsTabContentProps> = ({
                                                                  selection,
                                                                  onRefreshClick,
                                                                  onUnselectClick,
                                                                  // rows,
                                                                  // columns,
                                                                  // onPaginationChange,
                                                                  // onSelectionChange,
                                                                  // rowSelectionModel,
                                                                  // paginationModel
                                                                }) => {
  return (
    <Stack flex={1} minWidth="400px" spacing={1}>
      <Stack direction="row" alignItems="end">
        <Typography variant="subtitle1" component="span" lineHeight={1} flexGrow={1}>
          Models that stored in database:
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
      {/*<CustomDataGrid*/}
      {/*  rows={rows}*/}
      {/*  columns={columns}*/}
      {/*  onPaginationModelChange={onPaginationChange}*/}
      {/*  onRowSelectionModelChange={onSelectionChange}*/}
      {/*  rowSelectionModel={rowSelectionModel}*/}
      {/*  paginationModel={paginationModel}*/}
      {/*  pageSizeOptions={DEFAULT_PAGE_SIZE_OPTIONS}*/}
      {/*/>*/}
    </Stack>
  )
}