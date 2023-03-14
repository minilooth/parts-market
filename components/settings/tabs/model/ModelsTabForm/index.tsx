import React from "react"
import {Button, Fade, Stack, Typography} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {yupResolver} from "@hookform/resolvers/yup";
import {FieldValues, FormProvider, useForm} from "react-hook-form";

import {Model} from "core/types";
import {Optional} from "core/types/common";
import {FormUtils} from "core/utils/form";
import {FormInputText} from "components/common/form/FormInputText";
import {ModelSchema} from "core/schemas/model";
import {FormInputDropdown} from "components/common/form/FormInputDropdown";
import {useMakes} from "core/hooks/entities/useMakes";

interface ModelsTabFormProps {
  selection: Optional<Model>;
  onSave: (model: Model, callback: () => void) => void | Promise<void>;
  onDelete: (model: Model, callback: () => void) => void | Promise<void>;
}

export const ModelsTabForm: React.FC<ModelsTabFormProps> = ({selection, onSave, onDelete}) => {
  const makes = useMakes();

  const methods = useForm({mode: "onChange", resolver: yupResolver(ModelSchema)})
  const {handleSubmit, reset, formState: {errors, isValid}, getValues, trigger} = methods

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

  const handleResetClick = async () => {
    const values = getValues();
    reset({ ...values, makeId: undefined }, { keepDefaultValues: true })
    await trigger();
  }

  return (
    <Stack direction="row" flex={1} minWidth="400px">
      <Stack flex={0.5}>

        <Stack direction="row" alignItems="end" height={32}>
          <Typography variant="subtitle1" lineHeight={1} flexGrow={1}>
            {selection ? 'Edit an existing model' : 'Create new model'}
          </Typography>
        </Stack>

        <FormProvider {...methods}>
          <FormInputDropdown
            size="small"
            name="makeId"
            defaultValue=""
            options={makes.content}
            labelKey="name"
            valueKey="id"
            label="Make"
            margin="normal"
            error={!!errors.makeId}
            helperText={errors.makeId?.message as string}
            onResetClick={handleResetClick}
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
}