import * as yup from "yup";

export const EventFormSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  url: yup.string().url(),
});
