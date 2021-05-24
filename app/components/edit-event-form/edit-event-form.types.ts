import { Event } from "models/event/event"
export type EditEventFormData = {
  description: string
  endDate?: string | null
  endMonth?: string | null
  endYear: string | null
  endBC: boolean | null
  startBC: boolean
  startDate?: string | null
  startMonth?: string | null
  startYear: string | null
  title: string
  url: string | null
}

export interface EditEventFormProps {
  event: Event
  onSubmit: (data: EditEventFormData) => void
}
