import * as yup from 'yup';

export const ModelSchema = yup.object().shape({
  name: yup.string()
    .required('Field is required')
    .matches(/^[A-Za-zА-Яа-я0-9 -]+$/, 'Incorrect format')
    .max(100, 'Field must not exceed 100 characters'),
  makeId: yup.number()
    .required('Field is required')
})