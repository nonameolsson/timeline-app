import * as yup from 'yup'

export const AddEventFormSchema = yup.object().shape({
  title: yup
    .string()
    .required(),
  description: yup
    .string()
    .min(2)
})
