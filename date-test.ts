interface IEvent {
  id: number
  name: string
  date: string
}

const events: IEvent[] = [
  {
    id: 10001,
    name: 'Today event',
    date: '2021-04-08',
  },
  {
    id: 10002,
    name: 'Andreas',
    date: '1988-08-25',
  },
  {
    id: 10010,
    name: 'Testar med endast år',
    date: '1975-05',
  },
  {
    id: 10003,
    name: 'Jasmin',
    date: '1986-02-15',
  },
  {
    id: 10004,
    name: 'Joakim',
    date: '1991-04-15',
  },
  {
    id: 10013,
    name: 'Farfar',
    date: '1975',
  },
  {
    id: 10005,
    name: 'Last days',
    date: '1914-10-91',
  },
]

const newArr = events
  .map(({ name, date, id }) => {
    return { name, id, date }
  })
  .sort((a, b) => (a.date > b.date ? 1 : a.date < b.date ? -1 : 0))
  .map(event => event.name)
console.log(newArr)
