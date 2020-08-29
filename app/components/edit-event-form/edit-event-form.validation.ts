import * as yup from 'yup'

export const EditEventFormSchema = yup.object().shape({
  title: yup
    .string()
    .required(),
  description: yup
    .string()
    .required(),
  url: yup.string()
})
