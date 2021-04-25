import { TimelineStore, TimelineStoreModel } from "./timeline-store";

test("can be created", () => {
  const instance: TimelineStore = TimelineStoreModel.create({});

  expect(instance).toBeTruthy();
});
