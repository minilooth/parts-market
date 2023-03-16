import React from 'react';
import {Button, Fade, Stack, Typography} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import RefreshIcon from '@mui/icons-material/Refresh';

import {SettingsTabTableProps} from '@core/types/settings';
import {BodyType} from '@core/types';
import {CustomDataGrid} from '@components/common/wrappers/CustomDataGrid';
import {DefaultPageSizeOptions} from '@core/consts/pagination';

import NotFound from '@public/web-page.png';

export const BodyTypesTabTable: React.FC<SettingsTabTableProps<BodyType>> = (props) => {
  const {selection, onRefreshClick, onUnselectClick, ...other} = props;

  return (
    <Stack flex={1} minWidth="400px" spacing={1}>
      <Stack direction="row" alignItems="end">
        <Typography variant="subtitle1" component="span" lineHeight={1} flexGrow={1}>
          Body types that stored in database:
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
        {...other}
        pageSizeOptions={DefaultPageSizeOptions}
        noRowsOverlayText="No data found in database"
        noRowsOverlayImage={NotFound}
      />
    </Stack>
  )
};
