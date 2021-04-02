/* eslint-disable @typescript-eslint/camelcase */
import { destroy, Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { Event, EventModel, EventModelFromData } from "models/event/event"
import { withEnvironment } from "models/extensions/with-environment"
import * as Types from "services/api/api.types"

/**
 * Model description here for TypeScript hints.
 */
export const TimelineModel = types
  .model("Timeline")
  .props({
    id: types.identifierNumber,
    title: types.string,
    description: types.maybeNull(types.string),
    events: types.array(EventModel),
    created_at: types.string,
    updated_at: types.string,
  })
  .extend(withEnvironment)
  .views((self) => ({
    /**
     * Get a specific event from a timeline
     */
    getEvent: (id: number): Event | undefined => {
      return self.events.find((event) => event.id === id)
      // if (!event) throw new Error('No event found. Fix this error.')
    },

    /**
     * Get all events from a timeline
     */
    getEvents: () => {
      return self.events
    },
  }))
  /**
   * Following actions will be called with data received from the API and modify the store.
   */
  .actions((self) => ({
    updateTimelineInStore: (timelineSnapshot: Types.TimelineResponse) => {
      // eslint-disable-next-line
      const { created_at, description, title, updated_at } = timelineSnapshot

      // eslint-disable-next-line
      self.created_at = created_at
      // eslint-disable-next-line
      self.updated_at = updated_at
      self.title = title
      self.description = description
    },

    addNewEventToTimeline: (event: Types.EventResponse) => {
      const eventToCreate = EventModelFromData(event)

      self.events.push(eventToCreate)
    },

    deleteEventFromStore: (id: number) => {
      const eventToDelete = self.getEvent(id)
      if (eventToDelete) {
        destroy(eventToDelete)
      }
    },
  }))
  /**
   * Following actions will send requests to the API, and call actions defined in the first action definition
   */
  .actions((self) => ({
    createEvent: flow(function* (event: Types.EventRequest) {
      const result: Types.PostEventResult = yield self.environment.api.createEvent(event)

      if (result.kind === "ok") {
        self.addNewEventToTimeline(result.data)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),

    editTimeline: flow(function* (
      /** Data for updated timeline */
      data: Types.PutTimelineRequest,
      /** ID of timeline to update */
      id: number,
    ) {
      const result: Types.PutTimelineResult = yield self.environment.api.updateTimeline(data, id)

      if (result.kind === "ok") {
        self.updateTimelineInStore(result.data)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),

    deleteEvent: flow(function* (id: number) {
      const result: Types.DeleteEventResult = yield self.environment.api.deleteEvent(id)

      if (result.kind === "ok") {
        self.deleteEventFromStore(result.data.id)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),

    deleteAllEvents: flow(function* () {
      const eventsToDelete: number[] = []

      yield Promise.all(
        self.events.map(async (event) => {
          const result: Types.DeleteEventResult = await self.environment.api.deleteEvent(event.id)

          if (result.kind === "ok") {
            eventsToDelete.push(event.id)
          } else {
            __DEV__ && console.tron.log(result.kind)
          }
        }),
      )

      eventsToDelete.forEach((id) => {
        self.deleteEventFromStore(id)
      })
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
