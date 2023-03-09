import React from "react";
import {Button, Fade, Stack, Typography} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from "@mui/icons-material/Delete";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {useForm, FormProvider} from "react-hook-form";

import {Make} from "core/types/types";
import {FormInputText} from "components/common/FormInputText";
import {FormUtils} from "core/utils/form";

interface MakesTabFormProps {
  selection?: Make | null;
}

export const MakesTabForm: React.FC<MakesTabFormProps> = ({selection}) => {
  const methods = useForm({mode: "onChange"})
  const {handleSubmit, reset} = methods

  React.useEffect(() => {
    const transformed = FormUtils.transformDatesToMoments(selection || {});
    reset(transformed, {keepDefaultValues: true})
  }, [selection, reset])

  const handleSaveClick = (values: any) => {
    const transformed = FormUtils.transformMomentsToDates(values);
    console.log(transformed)
  }

  const handleDeleteClick = () => {
    console.log("DELETE BUTTON CLICKED");
  }

  return (
    <Stack height="100%" flex={1} minWidth="400px">
      <Stack width="50%" direction="row" alignItems="end" height={32}>
        <Typography variant="subtitle1" component="span" lineHeight={1} flexGrow={1}>
          {selection ? 'Edit make' : 'Create new make'}
        </Typography>
      </Stack>
      <Stack width="50%">
        <FormProvider {...methods}>
          <FormInputText
            size="small"
            name="name"
            defaultValue=""
            label="Name"
            placeholder="Please enter name"
            margin="normal"
          />
        </FormProvider>
        <Stack direction="row" justifyContent="end" columnGap={1}>
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
          >Save</Button>
        </Stack>
      </Stack>
      <Fade in={!!selection} unmountOnExit>
        <Stack width="50%" paddingTop={2}>
          <Typography
            variant="caption"
            component="span"
            display="flex"
            alignItems="center"
            columnGap={1}
          >
            <InfoOutlinedIcon fontSize="small" color="primary"/>
            Please unselect item in table to return to creation mode
          </Typography>
        </Stack>
      </Fade>
    </Stack>
  )
}