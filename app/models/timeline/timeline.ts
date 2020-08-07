import { destroy, Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { Event, EventModel } from "models/event/event"
import { withEnvironment } from "models/extensions/with-environment"
import * as Types from "services/api/api.types"

/**
 * Model description here for TypeScript hints.
 */
export const TimelineModel = types
  .model("Timeline")
  .props({
    id: types.identifier,
    title: types.string,
    description: types.string,
    events: types.array(EventModel),
    createdAt: types.string,
    updatedAt: types.string
  })
  .extend(withEnvironment)
  .views(self => ({
    /**
     * Get a specific event from a timeline
     */
    getEvent: (id: string): Event | undefined => {
      return self.events.find(event => event.id === id.toString())
      // if (!event) throw new Error('No event found. Fix this error.')
    },

    /**
     * Get all events from a timeline
     */
    getEvents: () => {
      return self.events
    }
  }))
  .actions(self => ({
    updateTimelineInStore: (timelineSnapshot: Types.Timeline) => {
      const { created_at, description, title, updated_at } = timelineSnapshot

      self.createdAt = created_at
      self.updatedAt = updated_at
      self.title = title
      self.description = description
    },

    deleteEventFromStore: (eventId: string) => {
      const eventToDelete = self.getEvent(eventId) as Event // TODO: Should we use type casting or make sure higher in the tree it will be an Event?
      destroy(eventToDelete)
    }
  }))
/**
   * Following actions will send requests to the API, and call actions defined in the first action definition
   */
  .actions(self => ({
    editTimeline: flow(function * (timeline: { id: string, title: string, description: string }) {
      const result: Types.PutTimelineResult = yield self.environment.api.updateTimeline(timeline)

      if (result.kind === "ok") {
        self.updateTimelineInStore(result.timeline)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),

    deleteEvent: flow(function * (id: string) {
      const result: Types.DeleteEventResult = yield self.environment.api.deleteEvent(id)

      if (result.kind === "ok") {
        self.deleteEventFromStore(result.event)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),

    deleteAllEvents: flow(function * () {
      self.events.forEach(flow(function * (event) {
        const result: Types.DeleteEventResult = yield self.environment.api.deleteEvent(event.id)

        if (result.kind === "ok") {
          self.deleteEventFromStore(result.event)
        } else {
          __DEV__ && console.tron.log(result.kind)
        }
      }))
    }),
  }))

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
