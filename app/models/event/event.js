/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/camelcase */
import { types, flow } from "mobx-state-tree"
import { withEnvironment } from "models/extensions/with-environment"
/**
 * Model description here for TypeScript hints.
 */
export const EventModel = types
  .model("Event")
  .props({
    id: types.identifierNumber,
    title: types.string,
    description: types.maybeNull(types.string),
    timeline: types.maybeNull(types.number),
    url: types.maybeNull(types.string),
    created_at: types.string,
    updated_at: types.string,
    date: types.string,
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  // Following actions will send requests to the API, and call actions defined in the first action definition
  .actions((self) => {
    const updateEventInStore = (eventSnapshot) => {
      const { title, description, date, created_at, url, timeline, updated_at } = eventSnapshot
      self.title = title
      self.description = description
      self.url = url
      self.timeline = timeline ? timeline.id : null
      self.updated_at = updated_at
      self.created_at = created_at
      self.date = date
    }
    const updateEvent = flow(function* (event, id) {
      const result = yield self.environment.api.updateEvent(event, id)
      if (result.kind === "ok") {
        updateEventInStore(result.data)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    })
    return {
      updateEvent,
    }
  })
export const EventModelFromData = (event) => {
  return EventModel.create({
    id: event.id,
    title: event.title,
    description: event.description,
    url: event.url,
    timeline: event.timeline ? event.timeline.id : null,
    created_at: event.created_at,
    updated_at: event.updated_at,
    date: event.date.toString(),
  })
}
//# sourceMappingURL=event.js.map
