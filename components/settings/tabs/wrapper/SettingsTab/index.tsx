import React from 'react';
import {IconButton, Stack, Typography} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import {selectIsMenuExpanded, toggleMenuExpansion} from '@core/store/features/settings';
import {useAppDispatch, useAppSelector} from '@core/store/hooks';

interface SettingsTabProps {
  title: string;
}

export const SettingsTab: React.FC<React.PropsWithChildren<SettingsTabProps>> = ({children, title}) => {
  const dispatch = useAppDispatch();
  const expanded = useAppSelector(selectIsMenuExpanded);

  const handleToggleMenu = () => {
    dispatch(toggleMenuExpansion());
  }

  return (
    <Stack flex={1} spacing={1}>
      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton size="small" onClick={handleToggleMenu}>
          {expanded ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
        </IconButton>
        <Typography variant="h5" fontWeight={500}>
          {title}
        </Typography>
      </Stack>
      {children}
    </Stack>
  )
}