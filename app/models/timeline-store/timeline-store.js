/* eslint-disable @typescript-eslint/camelcase */
import { types, flow } from "mobx-state-tree"
import { EventModel } from "../event/event"
import { TimelineModel } from "../timeline/timeline"
import { withEnvironment } from "../extensions/with-environment"
/**
 * Model description here for TypeScript hints.
 */
export const TimelineStoreModel = types
  .model("TimelineStore")
  .props({
    timelines: types.map(TimelineModel),
  })
  .extend(withEnvironment)
  .views((self) => ({
    hasTimelines: () => {
      return self.timelines.size > 0
    },
    getEventFromTimeline: (id, eventId) => {
      const timeline = self.timelines.get(id.toString())
      if (!timeline) return undefined
      // if (!timeline) throw new Error(`No timeline with id ${id} was found`)
      return timeline.events.find((event) => event.id === eventId)
    },
    getTimeline: (id) => {
      const timeline = self.timelines.get(id.toString())
      // if (!timeline) throw new Error(`No timeline with id ${id} was found`)
      return timeline
    },
    getTimelinesArray: () => {
      const arr = Array.from(self.timelines)
      const modifiedArr = arr.map((item) => item[1])
      return modifiedArr
    },
  }))
  /**
   * Following actions will be called with data received from the API and modify the store.
   */
  .actions((self) => ({
    resetStore: () => {
      self.timelines.clear()
    },
    addTimelinesToStore: (timelineSnapshot) => {
      const createEventModelFromData = (event) => {
        return EventModel.create({
          id: event.id,
          title: event.title,
          description: event.description,
          url: event.url,
          timeline: event.timeline,
          created_at: event.created_at,
          updated_at: event.updated_at,
          date: event.date.toString(),
        })
      }
      const timelineModelFromSnapshot = (timeline) => {
        return TimelineModel.create({
          id: timeline.id,
          title: timeline.title,
          description: timeline.description,
          events: timeline.events.map((event) => createEventModelFromData(event)),
          created_at: timeline.created_at,
          updated_at: timeline.updated_at,
        })
      }
      const timelinesModel = timelineSnapshot.map((timeline) => timelineModelFromSnapshot(timeline))
      timelinesModel.forEach((timeline) => {
        // Do not add/update timeline if it already exits
        if (!self.timelines.has(timeline.id.toString())) {
          self.timelines.set(timeline.id.toString(), timeline)
        }
      })
    },
    deleteTimelineFromStore: (timelineId) => {
      self.timelines.delete(timelineId.toString())
    },
  }))
  /**
   * Following actions will send requests to the API, and call actions defined in the first action definition
   */
  .actions((self) => ({
    createTimeline: flow(function* (data) {
      const result = yield self.environment.api.createTimeline(data)
      if (result.kind === "ok") {
        const timelineToAdd = [] // NOTE: Since `addTimelineToStore` expects an array, we create one for just this timeline.
        timelineToAdd.push(result.data)
        self.addTimelinesToStore(timelineToAdd)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
    getTimelines: flow(function* (userId) {
      const result = yield self.environment.api.getTimelinesByUser(userId)
      if (result.kind === "ok") {
        self.addTimelinesToStore(result.data)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
    deleteTimeline: flow(function* (timelineId) {
      const result = yield self.environment.api.deleteTimeline(timelineId)
      if (result.kind === "ok") {
        self.deleteTimelineFromStore(timelineId)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  }))
//# sourceMappingURL=timeline-store.js.map
