import * as yup from "yup"
export const EditTimelineFormSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
})
//# sourceMappingURL=edit-timeline-form.validation.js.map
