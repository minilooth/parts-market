import React from "react";
import {Button, Fade, Stack, Typography} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from "@mui/icons-material/Delete";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {useForm, FormProvider} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import {Make} from "core/types/types";
import {FormInputText} from "components/common/form/FormInputText";
import {FormUtils} from "core/utils/form";
import {MakeSchema} from "core/schemas/make";

interface MakesTabFormProps {
  selection?: Make | null;
}

export const MakesTabForm: React.FC<MakesTabFormProps> = ({selection}) => {
  const methods = useForm({mode: "onChange", resolver: yupResolver(MakeSchema)})
  const {handleSubmit, reset, formState: {errors, isValid}} = methods

  React.useEffect(() => {
    const transformed = FormUtils.transformDatesToMoments(selection || {});
    reset(transformed, {keepDefaultValues: true})
  }, [selection, reset])

  const handleSaveClick = async (values: any) => {
    const transformed = FormUtils.transformMomentsToDates(values);
    console.log(transformed)
  }

  const handleDeleteClick = async () => {
    console.log("DELETE BUTTON CLICKED");
  }

  return (
    <Stack direction="row" flex={1} minWidth="400px">
      <Stack flex={0.5}>

        <Stack direction="row" alignItems="end" height={32}>
          <Typography variant="subtitle1" lineHeight={1} flexGrow={1}>
            {selection ? 'Edit an existing make' : 'Create new make'}
          </Typography>
        </Stack>

        <FormProvider {...methods}>
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