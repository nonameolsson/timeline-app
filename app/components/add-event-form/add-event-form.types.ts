export type AddEventFormData = {
  description: string
  endDate?: string | null
  endMonth?: string | null
  endYear: string | null
  endBC: boolean
  startBC: boolean
  startDate?: string | null
  startMonth?: string | null
  startYear: string | null
  title: string
  url: string | null
}

export interface AddEventFormProps {
  onSubmit: (data: AddEventFormData) => void
}
