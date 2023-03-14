import * as yup from "yup";

export const GenerationSchema = yup.object().shape({
  name: yup.string()
    .required('Field is required')
    .matches(/^[A-Za-zА-Яа-я0-9 -]+$/, 'Incorrect format')
    .max(100, 'Field must not exceed 100 characters'),
  modelId: yup.number()
    .required('Field is required'),
  issuedFrom: yup.number()
    .required('Field is required')
    .min(1960, 'Field must be more than 1960')
    .max(new Date().getFullYear(), `Field must be less than ${new Date().getFullYear()}`)
    .typeError('Value must be a number'),
  issuedTo: yup.number()
    .min(1960, 'Value must be more than 1960')
    .max(new Date().getFullYear(), `Value must be less than ${new Date().getFullYear()}`)
    .typeError('Value must be a number'),
})