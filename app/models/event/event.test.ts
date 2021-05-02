import { Event, EventModel } from "./event"

test("can be created", () => {
  const instance: Event = EventModel.create({})

  expect(instance).toBeTruthy()
})
