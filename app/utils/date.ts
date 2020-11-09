import { format } from 'date-fns'

// export const formatShortISO = (date: Date): string => format(date, { representation: 'date' })

export const formatDateYear = (date?: Date | null, empty = ''): string => (date ? format(date, 'yyyy-MM-dd') : empty)
export const formatShortTime = (date?: Date | null, empty = ''): string => (date ? format(date, 'HH:mm') : empty)

export const formatDateTime = (date?: Date, empty = ''): string => (date ? format(date, `yyyy-MM-dd'T'HH:mm`) : empty)
