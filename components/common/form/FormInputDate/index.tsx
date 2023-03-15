import React from 'react'
import {Controller, useFormContext} from 'react-hook-form'
import {DatePicker, DatePickerProps, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment'

interface FormInputDateProps extends DatePickerProps<unknown> {
  name: string;
}

// <FormInputDate
//   name="createdAt"
//   label="Updated At"
//   defaultValue=""
//   format="d MMMM YYYY"
//   slotProps={{
//     textField: {
//       size: 'small',
//       margin: 'normal',
//       helperText: 'Helper text',
//       error: true,
//       onKeyDown: (event) => {
//         event.preventDefault()
//         event.stopPropagation()
//       }
//     },
//     openPickerButton: {
//       size: 'small'
//     }
//   }}
//   sx={{
//     width: '50%'
//   }}
// />

export const FormInputDate: React.FC<FormInputDateProps> = ({name, defaultValue, ...other}) => {
  const {control} = useFormContext()

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({field}) => (
          <DatePicker
            {...field}
            {...other}
            // variant='inline'
            // id={`date-${Math.random()}`}
            // label={label}
            // rifmFormatter={(val) => val.replace(/[^[a-zA-Z0-9-]*$]+/gi, '')}
            // refuse={/[^[a-zA-Z0-9-]*$]+/gi}
            // autoOk
            // KeyboardButtonProps={{
            //'aria-label': 'change date'
            // }}
            // format={DATE_FORMAT}
          />
        )}
      />
    </LocalizationProvider>
  )
}