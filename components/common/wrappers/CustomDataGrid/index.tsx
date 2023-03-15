import React from 'react'
import {DataGrid, DataGridProps} from '@mui/x-data-grid';
import {StaticImageData} from 'next/image';

import {CustomNoRowsOverlay} from '@components/common/wrappers/CustomNoRowsOverlay';
import {Page} from '@core/types/common';
import {PageableUtils} from '@core/utils/pageable';

interface CustomDataGridProps {
  noRowsOverlayText: string;
  noRowsOverlayImage?: StaticImageData;
  columns: DataGridProps['columns'];
  rows: Page<any>;
  rowSelectionModel?: DataGridProps['rowSelectionModel'];
  paginationModel?: DataGridProps['paginationModel'];
  onPaginationModelChange?: DataGridProps['onPaginationModelChange'];
  onRowSelectionModelChange?: DataGridProps['onRowSelectionModelChange'];
  pageSizeOptions?: DataGridProps['pageSizeOptions'];
  props?: Omit<DataGridProps, 'columns' | 'rows'> & Omit<DataGridProps['sx'], 'width' | 'minWidth' | '& .MuiDataGrid-cell:focus' | '& .MuiDataGrid-columnHeader:focus' | '& .MuiDataGrid-cell:focus-within' | '& .MuiDataGrid-columnHeader:focus-within' | '& .MuiDataGrid-columnHeader:last-child' | '& .MuiDataGrid-columnHeader:last-child > .MuiDataGrid-columnSeparator'>
  width?: string;
  minWidth?: string;
}

export const CustomDataGrid: React.FC<CustomDataGridProps> = ({
                                                                noRowsOverlayText,
                                                                noRowsOverlayImage,
                                                                columns = [],
                                                                rows = PageableUtils.getEmptyPage(),
                                                                rowSelectionModel,
                                                                paginationModel,
                                                                onPaginationModelChange,
                                                                onRowSelectionModelChange,
                                                                pageSizeOptions,
                                                                props = {},
                                                                width = '100%',
                                                                minWidth
                                                              }) => {
  const {sx, ...otherProps} = props;

  return (
    <DataGrid
      sx={{
        width: width,
        minWidth: minWidth,
        '& .MuiDataGrid-cell:focus': {
          outline: 'none',
        },
        '& .MuiDataGrid-columnHeader:focus': {
          outline: 'none',
        },
        '& .MuiDataGrid-cell:focus-within': {
          outline: 'none',
        },
        '& .MuiDataGrid-columnHeader:focus-within': {
          outline: 'none',
        },
        '& .MuiDataGrid-columnHeader:last-child': {
          paddingRight: 2,
        },
        '& .MuiDataGrid-columnHeader:last-child > .MuiDataGrid-columnSeparator': {
          display: 'none',
        },
        ...sx
      }}
      columns={columns}
      rows={rows.content}
      rowSelectionModel={rowSelectionModel}
      paginationModel={paginationModel}
      onPaginationModelChange={onPaginationModelChange}
      onRowSelectionModelChange={onRowSelectionModelChange}
      pageSizeOptions={pageSizeOptions}
      paginationMode="server"
      rowCount={rows.totalElements}
      slots={{
        noRowsOverlay: () => <CustomNoRowsOverlay text={noRowsOverlayText} image={noRowsOverlayImage}/>,
      }}
      {...otherProps}
    />
  )
}