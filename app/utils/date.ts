import { format } from "date-fns"

export const formatDateYear = (date?: Date | null, empty = ""): string =>
  date ? format(date, "yyyy-MM-dd") : empty
export const formatShortTime = (date?: Date | null, empty = ""): string =>
  date ? format(date, "HH:mm") : empty

export const formatDateTime = (date?: Date, empty = ""): string =>
  date ? format(date, `yyyy-MM-dd'T'HH:mm`) : empty

/**
 * Parse a timeline string to get year, month and date
 *
 * @param dateString String containing date. Could be `1998-08-20`, `1988-08` or `1988`
 * @returns Object with year, month and date property
 */
export const parseTimelineDate = (
  dateString: string,
): { year: string; month: string; date: string } => {
  const dateArray = dateString.split("-")

  if (!dateArray[0]) throw new Error("Year is required in a date string")

  const isValidYear = parseFloat(dateArray[0])
  if (!isValidYear) throw new Error("Not a valid year")

  return {
    year: dateArray[0],
    month: dateArray[1],
    date: dateArray[2],
  }
}

/**
 * Convert date for an event to a valid timeline date string.
 *
 * @param year
 * @param month
 * @param date
 * @returns A valid timeline date string like `1988`, `1988-8` or `1988-12-15`
 */
export const convertValuesToTimelineDateString = (
  year: string | null,
  month?: string | null | undefined,
  date?: string | null | undefined,
): string | null => {
  if (!year) return null

  let formattedDate = year
  if (month) formattedDate = `${formattedDate}-${month}`
  if (date) formattedDate = `${formattedDate}-${date}`

  return formattedDate.toString()
}
