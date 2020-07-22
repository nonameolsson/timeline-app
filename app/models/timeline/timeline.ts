import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { Timeline as TimelineRawData } from "services/api"
import { Event, EventModel, EventModelFromData } from "models/event/event"
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
    getEvent: (id: string): Event => {
      const event = self.events.find(event => event.id === id)

      if (!event) throw new Error(`No timeline with id ${id} was found`)

      return event
    },

    /**
     * Get all events from a timeline
     */
    getEvents: () => {
      return self.events
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
/**
   * Following actions will be called with data received from the API and modify the store.
   */
  .actions(self => ({
    updateTimelineInStore: (timelineSnapshot: Types.Timeline) => {
      // const timelineModel: Timeline = TimelineModelFromData(timelineSnapshot)
      const { created_at, description, id, title, updated_at } = timelineSnapshot

      self.createdAt = created_at
      self.updatedAt = updated_at
      self.title = title
      self.description = description
    }
  }))
  /**
   * Following actions will send requests to the API, and call actions defined in the first action definition
   */
  .actions(self => ({
    updateTimeline: flow(function * (timeline: { id: string, title: string, description: string }) {
      const result: Types.PutTimelineResult = yield self.environment.api.updateTimeline(timeline)

      if (result.kind === "ok") {
        self.updateTimelineInStore(result.timeline)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    })
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

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
