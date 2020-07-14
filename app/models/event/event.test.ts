import { EventModel, Event } from "./event"

test("can be created", () => {
  const instance: Event = EventModel.create({})

  expect(instance).toBeTruthy()
})