import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { EventModel } from "../event/event"

/**
 * Model description here for TypeScript hints.
 */
export const TimelineModel = types
  .model("Timeline")
  .props({
    id: types.identifierNumber,
    title: types.string,
    description: types.string,
    // events: types.map(EventModel)
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type TimelineType = Instance<typeof TimelineModel>
export interface Timeline extends TimelineType {}
type TimelineSnapshotType = SnapshotOut<typeof TimelineModel>
export interface TimelineSnapshot extends TimelineSnapshotType {}
