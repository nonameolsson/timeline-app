import * as yup from "yup"

export const AddTimelineFormSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().min(2),
})
