import * as yup from "yup";
export const AddEventFormSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string(),
    url: yup.string().url(),
});
//# sourceMappingURL=add-event-form.validation.js.map