import React from 'react';
import {
  FormControl,
  FormControlProps,
  FormHelperText, IconButton,
  InputLabel,
  MenuItem,
  Select, SelectChangeEvent,
  SelectProps
} from '@mui/material';
import {Controller, useFormContext} from 'react-hook-form';
import ClearIcon from '@mui/icons-material/Clear';

import {Optional} from '@core/types/common';

interface FormInputDropdownProps extends Omit<SelectProps<string>, 'margin' | 'notched'> {
  name: string;
  label: Optional<string>;
  options: Array<any>;
  valueKey: Optional<string>;
  labelKey: Optional<string>;
  labelGetter?: Optional<(object: any) => void>;
  helperText?: Optional<string>;
  margin: FormControlProps['margin'];
  onResetClick: React.MouseEventHandler<HTMLButtonElement>;
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
                                                                      error,
                                                                      helperText,
                                                                      margin,
                                                                      sx,
                                                                      placeholder,
                                                                      onResetClick,
                                                                      onChange: componentOnChange,
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

  const generatePlaceholderOption = () => {
    if (placeholder) {
      return (
        <MenuItem value="" selected>
          <em>{placeholder}</em>
        </MenuItem>
      )
    }
  }

  const handleChange = (controllerOnChange: (...event: any[]) => void, event: SelectChangeEvent, child: React.ReactNode) => {
    if (componentOnChange) {
      componentOnChange(event, child);
    }
    controllerOnChange(event, child)
  }

  return (
    <FormControl size={size} margin={margin}>
      <InputLabel shrink={!!placeholder || undefined} error={error}>{label}</InputLabel>
      <Controller
        defaultValue={defaultValue}
        render={({field: {value, onChange: controllerOnChange, ...field}}) => (
          <Select
            value={options?.length > 0 ? value : defaultValue}
            {...field}
            {...other}
            size={size}
            error={error}
            label={label}
            notched={!!placeholder || undefined}
            displayEmpty={!!placeholder}
            onChange={(event, child) => handleChange(controllerOnChange, event, child)}
            MenuProps={{PaperProps: {sx: {maxHeight: 300}}}}
            endAdornment={
              <IconButton
                onClick={onResetClick}
                size="small"
                sx={{marginRight: -1, display: !value ? 'none' : ''}}
              >
                <ClearIcon fontSize="small"/>
              </IconButton>
            }
            sx={{
              ...sx,
              '& .MuiSelect-iconOutlined': {
                display: value ? 'none' : ''
              },
              '& .MuiSelect-select': {
                opacity: value ? 1 : 0.42
              }
            }}
          >
            {generatePlaceholderOption()}
            {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </FormControl>
  )
}