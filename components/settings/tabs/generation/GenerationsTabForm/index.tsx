import React from 'react';
import {Button, Fade, Stack, Typography} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {FieldValues, FormProvider, useForm} from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import {Generation} from '@core/types';
import {SettingsTabFormProps} from '@core/types/settings';
import {FormUtils} from '@core/utils/form';
import {FormInputDropdown} from '@components/common/form/FormInputDropdown';
import {FormInputText} from '@components/common/form/FormInputText';
import {useModels} from '@core/hooks/entities/useModels';
import {GenerationSchema} from '@core/schemas/generation';
import {YearsAscending, YearsDescending} from '@core/consts/settings';
import {useDialogState} from '@core/hooks/useDialogState';
import {DeleteConfirmationDialog} from '@components/dialog/DeleteConfirmationDialog';
import {useNumberedQueryParam} from '@core/hooks/useNumberedQueryParam';

export const GenerationsTabForm: React.FC<SettingsTabFormProps<Generation>> = ({selection, onSave, onDelete}) => {
  const make = useNumberedQueryParam('make');
  const models = useModels(make);
  const methods = useForm({mode: 'onChange', resolver: yupResolver(GenerationSchema)})
  const [dialogOpened, openDialog, closeDialog] = useDialogState();

  const {handleSubmit, reset, formState: {errors, isValid}, setValue} = methods

  React.useEffect(() => {
    const transformed = FormUtils.transformDatesToMoments(selection || {});
    reset(transformed, {keepDefaultValues: true})
  }, [selection, reset])

  const handleSaveClick = (values: FieldValues) => {
    const transformed = FormUtils.transformMomentsToDates(values);
    onSave(transformed, () => {
      reset({}, {keepDefaultValues: true});
    });
  }

  const handleDeleteClick = () => {
    if (!selection) {
      return;
    }
    onDelete(selection, () => {
      closeDialog();
      reset({}, {keepDefaultValues: true})
    });
  }

  return (
    <Stack direction="row" flex={1} minWidth="400px">
      <Stack flex={0.5}>

        <Stack direction="row" alignItems="end" height={32}>
          <Typography variant="subtitle1" lineHeight={1} flexGrow={1}>
            {selection ? 'Edit an existing generation:' : 'Create new generation:'}
          </Typography>
        </Stack>

        <FormProvider {...methods}>
          <FormInputDropdown
            size="small"
            name="modelId"
            defaultValue=""
            options={models}
            labelKey="name"
            valueKey="id"
            label="Model"
            margin="normal"
            disabled={!make}
            error={!!errors.modelId}
            helperText={errors.modelId?.message as string}
            onResetClick={() => setValue('modelId', undefined, {shouldValidate: true})}
          />
          <FormInputText
            size="small"
            name="name"
            defaultValue=""
            label="Name"
            placeholder="Please enter name"
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message as string}
          />
          <FormInputDropdown
            size="small"
            name="issuedFrom"
            defaultValue=""
            options={YearsAscending}
            labelKey="value"
            valueKey="value"
            label="Issued From"
            margin="normal"
            error={!!errors.issuedFrom}
            helperText={errors.issuedFrom?.message as string}
            onResetClick={() => setValue('issuedFrom', undefined, {shouldValidate: true})}
          />
          <FormInputDropdown
            size="small"
            name="issuedTo"
            defaultValue=""
            options={YearsDescending}
            labelKey="value"
            valueKey="value"
            label="Issued To"
            margin="normal"
            error={!!errors.issuedTo}
            helperText={errors.issuedTo?.message as string}
            onResetClick={() => setValue('issuedTo', undefined, {shouldValidate: true})}
          />
        </FormProvider>

        <Stack direction="row" justifyContent="end" spacing={1}>
          <Fade in={!!selection} unmountOnExit>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon/>}
              size="small"
              onClick={openDialog}
            >Delete</Button>
          </Fade>
          <Button
            onClick={handleSubmit(handleSaveClick)}
            variant="contained"
            color="success"
            size="small"
            startIcon={<SaveIcon/>}
            disabled={!isValid}
          >Save</Button>
        </Stack>

        <Fade in={!!selection} unmountOnExit>
          <Stack direction="row" alignItems="center" spacing={1} paddingTop={2}>
            <InfoOutlinedIcon fontSize="small" color="primary"/>
            <Typography variant="caption">
              Please click &quot;Unselect&quot; button or manually unselect item in table to return to creation mode
            </Typography>
          </Stack>
        </Fade>

        <DeleteConfirmationDialog
          title="Are you absolutely sure?"
          buttonText="I understand the consequences, delete this generation"
          open={dialogOpened}
          matches={selection?.name}
          onClose={closeDialog}
          onConfirm={handleDeleteClick}
        >
          <Stack spacing={1} width="100%">
            <Typography variant="body2" textAlign="justify">
              This action <b>cannot</b> be undone.
              This will permanently delete generation and all other entities which
              linked with them.
            </Typography>
            <Typography variant="body2">
              Please type <b>{selection?.name}</b> to confirm.
            </Typography>
          </Stack>
        </DeleteConfirmationDialog>

      </Stack>
    </Stack>
  )
};