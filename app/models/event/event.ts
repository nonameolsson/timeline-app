import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { Event as EventData } from "services/api"

/**
 * Model description here for TypeScript hints.
 */
export const EventModel = types
  .model("Event")
  .props({
    id: types.identifierNumber,
    title: types.string,
    description: types.string,
    timeline: types.number,
    createdAt: types.string,
    updatedAt: types.string
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

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

export const EventModelFromData = (event: EventData): Event => {
  return EventModel.create({
    id: event.id,
    title: event.title,
    description: event.description,
    timeline: event.timeline,
    createdAt: event.created_at,
    updatedAt: event.updated_at
  })
}
