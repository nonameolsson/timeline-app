import { EventStoreModel, EventStore } from "./event-store"

test("can be created", () => {
  const instance: EventStore = EventStoreModel.create({})

  expect(instance).toBeTruthy()
})