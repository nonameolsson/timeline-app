import * as yup from "yup"

export const AddEventFormSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  url: yup.string().url().nullable(),
  startBC: yup.boolean().required(),
  startYear: yup.number().integer().required(),
  startMonth: yup
    .number()
    .min(1)
    .max(12)
    .integer()
    .transform((value) => (isNaN(value) ? undefined : value)),
  startDate: yup
    .number()
    .min(1)
    .max(31)
    .integer()
    .transform((value) => (isNaN(value) ? undefined : value)),
  endBC: yup.boolean().required(),
  endYear: yup.number().integer(),
  endMonth: yup
    .number()
    .min(1)
    .max(12)
    .integer()
    .transform((value) => (isNaN(value) ? undefined : value)),
  endDate: yup
    .number()
    .min(1)
    .max(31)
    .integer()
    .transform((value) => (isNaN(value) ? undefined : value)),
})
