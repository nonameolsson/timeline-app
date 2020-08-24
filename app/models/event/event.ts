/* eslint-disable @typescript-eslint/camelcase */
import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment } from "models/extensions/with-environment"
import * as Types from "services/api/api.types"

/**
 * Model description here for TypeScript hints.
 */
export const EventModel = types
  .model("Event")
  .props({
    id: types.identifier,
    title: types.string,
    description: types.string,
    timeline: types.number,
    createdAt: types.string,
    updatedAt: types.string
  })
  .extend(withEnvironment)
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  // Following actions will send requests to the API, and call actions defined in the first action definition
  .actions(self => {
    const updateEventInStore = (eventSnapshot: Types.Event) => {
      const { title, description, created_at, timeline, updated_at } = eventSnapshot

      self.title = title
      self.description = description
      self.updatedAt = updated_at
      self.createdAt = created_at
      self.timeline = timeline.id
    }

    const updateEvent = flow(function * (event: { id: string, title: string, description: string }) {
      const result: Types.PutEventResult = yield self.environment.api.updateEvent(event)

      if (result.kind === "ok") {
        updateEventInStore(result.event)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    })

    return {
      updateEvent
    }
  })

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type EventType = Instance<typeof EventModel>
export interface Event extends EventType {}
type EventSnapshotType = SnapshotOut<typeof EventModel>
export interface EventSnapshot extends EventSnapshotType {}

export const EventModelFromData = (event: Types.TimelineEvent | Types.Event) => {
  // Extract the ID if neccessary. On some endpoints the API returns a timeline instead of just the id
  const timelineId = typeof (event.timeline) === 'number' ? event.timeline : event.timeline.id

  return EventModel.create({
    id: event.id.toString(),
    title: event.title,
    description: event.description,
    timeline: timelineId,
    createdAt: event.created_at,
    updatedAt: event.updated_at
  })
}
