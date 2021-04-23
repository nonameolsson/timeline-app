import * as yup from 'yup'

export const EditEventFormSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  url: yup.string().url(),
})
