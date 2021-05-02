interface IEvent {
  id: number
  name: string
  startDate: string
  endDate: string | null
}

const events: IEvent[] = [
  {
    id: 10001,
    name: "Today event",
    startDate: "2021-04-08",
    endDate: null,
  },
  {
    id: 10002,
    name: "Andreas",
    startDate: "1988-08-25",
    endDate: null,
  },
  {
    id: 10010,
    name: "Testar med endast år",
    startDate: "1975-05",
    endDate: null,
  },
  {
    id: 10003,
    name: "Jasmin",
    startDate: "1986-02-15",
    endDate: null,
  },
  {
    id: 10004,
    name: "Joakim",
    startDate: "1991-04-15",
    endDate: null,
  },
  {
    id: 10013,
    name: "Farfar",
    startDate: "1975",
    endDate: null,
  },
  {
    id: 10005,
    name: "Last days",
    startDate: "1914-10-91",
    endDate: null,
  },
]

const newArr = events
  .map(({ name, startDate, id }) => {
    return { name, id, startDate }
  })
  .sort((a, b) => (a.startDate > b.startDate ? 1 : a.startDate < b.startDate ? -1 : 0))
  .map((event) => event.name)
console.log(newArr)
