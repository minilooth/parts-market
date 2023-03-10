import * as yup from "yup";

export const MakeSchema = yup.object().shape({
  name: yup.string()
    .required('Field is required')
    .matches(/^[A-Za-zА-Яа-я -]+$/, 'Incorrect format')
    .max(100, 'Field must not exceed 100 characters')
})