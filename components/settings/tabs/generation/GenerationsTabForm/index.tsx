import React from 'react';
import {Button, Fade, Stack, Typography} from "@mui/material";
import {yupResolver} from "@hookform/resolvers/yup";
import {FieldValues, FormProvider, useForm} from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {useRouter} from "next/router";

import {Generation} from "@core/types";
import {SettingsTabFormProps} from "@core/types/settings";
import {FormUtils} from "@core/utils/form";
import {FormInputDropdown} from "@components/common/form/FormInputDropdown";
import {FormInputText} from "@components/common/form/FormInputText";
import {useModels} from "@core/hooks/entities/useModels";
import {GenerationSchema} from "@core/schemas/generation";
import {YearsAscending, YearsDescending} from "@core/consts/settings";

export const GenerationsTabForm: React.FC<SettingsTabFormProps<Generation>> = ({selection, onSave, onDelete}) => {
  const router = useRouter();
  const {query} = router;

  const makeId = Number.parseInt(query.makeId as string) || undefined;

  const models = useModels(makeId);
  const methods = useForm({mode: "onChange", resolver: yupResolver(GenerationSchema)})
  const {handleSubmit, reset, formState: {errors, isValid}, setValue} = methods

  React.useEffect(() => {
    const transformed = FormUtils.transformDatesToMoments(selection || {});
    reset(transformed, {keepDefaultValues: true})
  }, [selection, reset])

  const handleSuccessSave = () => {
    reset({}, {keepDefaultValues: true});
  }

  const handleSaveClick = async (values: FieldValues) => {
    const transformed = FormUtils.transformMomentsToDates(values);
    await onSave(transformed, handleSuccessSave);
  }

  const handleSuccessDeletion = () => {
    reset({}, {keepDefaultValues: true})
  }

  const handleDeleteClick = async () => {
    if (selection) {
      await onDelete(selection, handleSuccessDeletion);
    }
  }

  const handleModelResetClick = () => {
    setValue("modelId", undefined, {shouldValidate: true})
  }

  const handleIssuedFromResetClick = () => {
    setValue("issuedFrom", undefined, {shouldValidate: true})
  }

  const handleIssuedToResetClick = () => {
    setValue("issuedTo", undefined, {shouldValidate: true})
  }

  return (
    <Stack direction="row" flex={1} minWidth="400px">
      <Stack flex={0.5}>

        <Stack direction="row" alignItems="end" height={32}>
          <Typography variant="subtitle1" lineHeight={1} flexGrow={1}>
            {selection ? 'Edit an existing generation' : 'Create new generation'}
          </Typography>
        </Stack>

        <FormProvider {...methods}>
          <FormInputDropdown
            size="small"
            name="modelId"
            defaultValue=""
            options={models.content}
            labelKey="name"
            valueKey="id"
            label="Model"
            margin="normal"
            disabled={!makeId}
            error={!!errors.modelId}
            helperText={errors.modelId?.message as string}
            onResetClick={handleModelResetClick}
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
            onResetClick={handleIssuedFromResetClick}
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
            onResetClick={handleIssuedToResetClick}
          />
        </FormProvider>

        <Stack direction="row" justifyContent="end" spacing={1}>
          <Fade in={!!selection} unmountOnExit>
            <Button
              variant="contained"
              startIcon={<DeleteIcon/>}
              size="small"
              onClick={() => handleDeleteClick()}
            >Delete</Button>
          </Fade>
          <Button
            onClick={handleSubmit(handleSaveClick)}
            variant="contained"
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

      </Stack>
    </Stack>
  )
};