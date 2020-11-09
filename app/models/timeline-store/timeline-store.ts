/* eslint-disable @typescript-eslint/camelcase */
import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"

import { Event, EventModel } from "../event/event"
import { Timeline, TimelineModel } from "../timeline/timeline"
import { withEnvironment } from "../extensions/with-environment"
import * as Types from "services/api/api.types"

/**
 * Model description here for TypeScript hints.
 */
export const TimelineStoreModel = types
  .model("TimelineStore")
  .props({
    timelines: types.map(TimelineModel),
  })
  .extend(withEnvironment)
  .views(self => ({
    hasTimelines: () => {
      return self.timelines.size > 0
    },
    getEventFromTimeline: (id: number, eventId: number): Event | undefined => {
      const timeline = self.timelines.get(id.toString())

      if (!timeline) return undefined
      // if (!timeline) throw new Error(`No timeline with id ${id} was found`)

      return timeline.events.find(event => event.id === eventId)
    },

    getTimeline: (id: number): Timeline | undefined => {
      const timeline = self.timelines.get(id.toString())

      // if (!timeline) throw new Error(`No timeline with id ${id} was found`)

      return timeline
    },
    getTimelinesArray: () => {
      const arr = Array.from(self.timelines)
      const modifiedArr = arr.map(item => item[1])

      return modifiedArr
    },
  }))
  /**
   * Following actions will be called with data received from the API and modify the store.
   */
  .actions(self => ({
    resetStore: () => {
      self.timelines.clear()
    },

    addTimelinesToStore: (timelineSnapshot: Types.TimelineResponse[]) => {
      const createEventModelFromData = (event: Types.TimelineEvent) => {
        return EventModel.create({
          id: event.id,
          title: event.title,
          description: event.description,
          url: event.url,
          timeline: event.timeline,
          created_at: event.created_at,
          updated_at: event.updated_at
        })
      }

      const timelineModelFromSnapshot = (timeline: Types.TimelineResponse) => {
        return TimelineModel.create({
          id: timeline.id,
          title: timeline.title,
          description: timeline.description,
          events: timeline.events.map(event => createEventModelFromData(event)),
          created_at: timeline.created_at,
          updated_at: timeline.updated_at,
        })
      }
      const timelinesModel: Timeline[] = timelineSnapshot.map(timeline => timelineModelFromSnapshot(timeline))

      timelinesModel.forEach(timeline => {
        // Do not add/update timeline if it already exits
        if (!self.timelines.has(timeline.id.toString())) {
          self.timelines.set(timeline.id.toString(), timeline)
        }
      })
    },

    deleteTimelineFromStore: (timelineId: number) => {
      self.timelines.delete(timelineId.toString())
    },
  }))
  /**
   * Following actions will send requests to the API, and call actions defined in the first action definition
   */
  .actions(self => ({
    createTimeline: flow(function * (data: Types.PostTimelineRequest) {
      const result: Types.PostTimelineResult = yield self.environment.api.createTimeline(data)

      if (result.kind === "ok") {
        const timelineToAdd: Types.TimelineResponse[] = [] // NOTE: Since `addTimelineToStore` expects an array, we create one for just this timeline.
        timelineToAdd.push(result.data)
        self.addTimelinesToStore(timelineToAdd)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
    getTimelines: flow(function * (userId: number) {
      const result: Types.GetTimelinesResult = yield self.environment.api.getTimelinesByUser(userId)

      if (result.kind === "ok") {
        self.addTimelinesToStore(result.data)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),

    deleteTimeline: flow(function * (timelineId: number) {
      const result: Types.DeleteTimelineResult = yield self.environment.api.deleteTimeline(timelineId)

      if (result.kind === "ok") {
        self.deleteTimelineFromStore(timelineId)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  }))

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type TimelineStoreType = Instance<typeof TimelineStoreModel>
export interface TimelineStore extends TimelineStoreType {}
type TimelineStoreSnapshotType = SnapshotOut<typeof TimelineStoreModel>
export interface TimelineStoreSnapshot extends TimelineStoreSnapshotType {}
