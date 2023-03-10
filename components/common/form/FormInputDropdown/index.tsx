import React from "react";
import {FormControl, InputLabel, MenuItem, Select, SelectProps} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";

interface FormInputDropdownProps extends SelectProps {
  name: string;
  label?: string;
  options: Array<any>;
  valueKey?: string;
  labelKey?: string;
  labelGetter?: (object: any) => void;
}

export const FormInputDropdown: React.FC<FormInputDropdownProps> = ({
                                                                      name,
                                                                      label,
                                                                      options,
                                                                      valueKey,
                                                                      labelKey,
                                                                      labelGetter,
                                                                      size,
                                                                      defaultValue,
                                                                      ...other
                                                                    }) => {
  const {control} = useFormContext()

  const generateSingleOptions = () => {
    return options.map((option: any) => (
      <MenuItem key={option[valueKey!]} value={option[valueKey!]}>
        {labelGetter ? labelGetter(option) : option[labelKey!]}
      </MenuItem>
    ))
  }

  return (
    <FormControl size={size}>
      <InputLabel>{label}</InputLabel>
      <Controller
        defaultValue={defaultValue}
        render={({field}) => (
          <Select
            {...field}
            {...other}
          >
            {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  )
}