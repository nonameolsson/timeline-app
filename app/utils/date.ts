import { format } from 'date-fns'

// export const formatShortISO = (date: Date): string => format(date, { representation: 'date' })

export const formatDateYear = (date?: Date | null, empty = ''): string => (date ? format(date, 'yyyy-MM-dd') : empty)
export const formatShortTime = (date?: Date | null, empty = ''): string => (date ? format(date, 'HH:mm') : empty)

export const formatDateTime = (date?: Date, empty = ''): string => (date ? format(date, `yyyy-MM-dd'T'HH:mm`) : empty)

interface TimelineDate {
  /**
   * negative true = BC
   *
   * negative false or undefined = AD
   */
  negative?: boolean;
  year: number;
  month?: number;
  day?: number;
}

// sista dagarna
// const date1: dateObject = {
//   negative: false,
//   year: 1914,
// };

// // sista dagarna oktober
// const date2: dateObject = {
//   year: 607,
//   month: 10,
// };

// // sista dagarna med låtsasdatum
// const date3: dateObject = {
//   year: 1914,
//   month: 10,
//   day: 25,
// };

// // jesus döps
// const date4: dateObject = {
//   year: 29,
// };

// // jesus dör
// const date5: dateObject = {
//   year: 33,
// };

// // jerusalem börjar återuppbyggas
// const date6: dateObject = {
//   negative: true,
//   year: 455,
// };

// // jerusalem färdigt
// const date7: dateObject = {
//   negative: true,
//   year: 406,
// };

// // andreas föds
// const date8: dateObject = {
//   negative: true,
//   year: 1988,
//   month: 8,
//   day: 25,
// };

export const getTimelineDate = (date: TimelineDate) => {
  return new Date(
    date.negative ? parseInt(`-${date.year}`) : date.year,
    date.month || 0,
    date.day || 1
  )
}

// const formattedDate = date(date8);

export const getTimelineDataString = ({ year, day, month, negative = false }: TimelineDate): string | undefined => {
  let readableData: string

  if (year) {
    readableData = `${year}`

    if (month) {
      readableData += `-${month}`

      if (day) {
        readableData += `-${day}`
      }
    }

    return negative ? `${readableData} BC` : readableData
  }
}
