import React from 'react';
import {CloseOutlined, SvgIconComponent} from '@mui/icons-material';
import {DialogTitle, IconButton, Stack, Typography} from '@mui/material';

interface CustomDialogTitleProps {
  title: string;
  Icon?: SvgIconComponent;
  closeButton?: boolean;
  closeDisabled?: boolean;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
}

export const CustomDialogTitle: React.FC<CustomDialogTitleProps> = ({
                                                                      title,
                                                                      Icon,
                                                                      closeButton = false,
                                                                      closeDisabled = false,
                                                                      onClose
                                                                    }) => {
  return (
    <DialogTitle>
      <Stack direction="row" alignItems="center">
        <Stack direction="row" flexGrow="1" alignItems="center" spacing={1}>
          {Icon && <Icon fontSize="inherit"/>}
          <Typography variant="h6">
            {title}
          </Typography>
        </Stack>
        {closeButton && (
          <IconButton size="small" onClick={onClose} disabled={closeDisabled}>
            <CloseOutlined fontSize="inherit"/>
          </IconButton>
        )}
      </Stack>
    </DialogTitle>
  );
};
