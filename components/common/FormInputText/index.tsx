import React from 'react';
import {TextField, TextFieldProps} from "@mui/material";
import { Controller, useFormContext } from 'react-hook-form'

type FormInputTextProps = TextFieldProps & {
  name: string;
}

export const FormInputText: React.FC<FormInputTextProps> = ({ name, defaultValue, ...other }) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <TextField
          {...field}
          {...other}
        />
      )}
    />
  )
}