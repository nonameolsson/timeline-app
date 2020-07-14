import { TimelineModel, Timeline } from "./timeline"

test("can be created", () => {
  const instance: Timeline = TimelineModel.create({})

  expect(instance).toBeTruthy()
})