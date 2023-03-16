import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, Divider} from '@mui/material';

import {CustomDialogTitle} from '@components/common/wrappers/CustomDialogTitle';
import {FormProvider, useForm} from 'react-hook-form';
import {FormInputText} from '@components/common/form/FormInputText';
import {Optional} from '@core/types/common';

interface DeleteConfirmationDialogProps {
  title: string;
  buttonText: string;
  open: boolean;
  matches: Optional<string>;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  onConfirm: React.MouseEventHandler<HTMLButtonElement>;
}

export const DeleteConfirmationDialog: React.FC<React.PropsWithChildren<DeleteConfirmationDialogProps>> = ({
                                                                                                             title,
                                                                                                             open,
                                                                                                             buttonText,
                                                                                                             children,
                                                                                                             matches,
                                                                                                             onClose,
                                                                                                             onConfirm,
                                                                                                           }) => {
  const methods = useForm({mode: 'onChange'})
  const {reset, watch} = methods

  const value = watch('value');

  React.useEffect(() => {
    reset()
  }, [matches, reset])

  return (
    <Dialog
      open={open}
      closeAfterTransition
      disableEscapeKeyDown
      maxWidth="sm"
      sx={{zIndex: 9998}}
    >
      <CustomDialogTitle title={title} closeButton onClose={onClose}/>
      <Divider/>
      <DialogContent sx={{paddingBottom: 1}}>
        {children}
        <FormProvider {...methods}>
          <FormInputText
            size="small"
            name="value"
            defaultValue=""
            margin="dense"
            fullWidth
          />
        </FormProvider>
      </DialogContent>
      <Divider/>
      <DialogActions sx={{paddingRight: 3, paddingLeft: 3}}>
        <Button key="confirm" variant="contained" color="error" fullWidth size="small" disabled={matches !== value}
                onClick={onConfirm}>
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
