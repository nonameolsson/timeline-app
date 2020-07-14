import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { EventModel, Event, EventSnapshot } from "../event/event"
import { withEnvironment } from "../extensions/with-environment"
import { GetEventsResult } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
export const EventStoreModel = types
  .model("EventStore")
  .props({
    events: types.optional(types.array(EventModel), [])
  })
  .extend(withEnvironment)
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    resetStore: () => {
      self.events.replace([])
    },
    saveEvents: (eventSnapshot: EventSnapshot[]) => {
      const eventsModel: Event[] = eventSnapshot.map(event => EventModel.create(event))

      self.events.replace(eventsModel)
    }
  }))
  .actions(self => ({
    getEvents: flow(function * () {
      const result: GetEventsResult = yield self.environment.api.getEvents()

      if (result.kind === "ok") {
        self.saveEvents(result.events)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    })
  }))

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type EventStoreType = Instance<typeof EventStoreModel>
export interface EventStore extends EventStoreType {}
type EventStoreSnapshotType = SnapshotOut<typeof EventStoreModel>
export interface EventStoreSnapshot extends EventStoreSnapshotType {}
