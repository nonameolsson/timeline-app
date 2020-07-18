import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { EventModel, Event, EventSnapshot, EventModelFromData } from "../event/event"
import { withEnvironment } from "../extensions/with-environment"
import { GetEventsResult, Timeline } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
export const EventStoreModel = types
  .model("EventStore")
  .props({
    allIds: types.array(types.number),
    byId: types.map(EventModel)
    // events: types.optional(types.array(EventModel), [])
  })
  .extend(withEnvironment)
  .views(self => ({
    getEventsByTimeline: (id: string) => {
      return self.byId.get(id)
    }
  }))
  .actions(self => ({
    resetStore: () => {
      self.allIds.clear()
      self.byId.clear()
    },
    addEventsFromTimeline: (timeline: Timeline) => {
      console.tron.log('addEventsFromTimeline', timeline)

      const eventsModel: Event[] = timeline.events.map(event => EventModelFromData(event))

      eventsModel.forEach(event => {
        self.byId.set(event.id.toString(), event)
        self.allIds.push(event.id)
      })
    },
    addEventsToStore: (eventSnapshot: EventSnapshot[]) => {
      const eventsModel: Event[] = eventSnapshot.map(event => EventModelFromData(event))

      eventsModel.forEach(event => {
        self.byId.set(event.id.toString(), event)
        self.allIds.push(event.id)
      })
    }
  }))
  .actions(self => ({
    getEvents: flow(function * () {
      const result: GetEventsResult = yield self.environment.api.getEvents()

      if (result.kind === "ok") {
        self.addEventsToStore(result.events)
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
