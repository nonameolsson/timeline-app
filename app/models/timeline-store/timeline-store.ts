import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"

import { EventSnapshot } from "../event/event"
import { Timeline, TimelineModel, TimelineModelFromData } from "../timeline/timeline"
import { withEnvironment } from "../extensions/with-environment"
import * as Types from "services/api/api.types"

/**
 * Model description here for TypeScript hints.
 */
export const TimelineStoreModel = types
  .model("TimelineStore")
  .props({
    timelines: types.map(TimelineModel)
  })
  .extend(withEnvironment)
  .views(self => ({
    hasTimelines: () => {
      return self.timelines.size > 0
    },
    getEventFromTimeline: (id: string, eventId: number): EventSnapshot | undefined => {
      const timeline = self.timelines.get(id)

      if (!timeline) throw new Error(`No timeline with id ${id} was found`)

      return timeline.events.find(event => event.id === eventId)
    },

    getTimeline: (id: string): Timeline => {
      const timeline = self.timelines.get(id)

      if (!timeline) throw new Error(`No timeline with id ${id} was found`)

      return timeline
    },
    getTimelinesArray: () => {
      const arr = Array.from(self.timelines)
      const modifiedArr = arr.map(item => item[1])

      return modifiedArr
    }
  }))
  // Following actions will be called with data received from the API and modify the store.
  .actions(self => ({
    resetStore: () => {
      self.timelines.clear()
    },
    addTimelinesToStore: (timelineSnapshot: Types.Timeline[]) => {
      const timelinesModel: Timeline[] = timelineSnapshot.map(timeline => TimelineModelFromData(timeline))
      timelinesModel.forEach(timeline => self.timelines.set(timeline.id, timeline))
    },
    updateTimelineInStore: (timelineSnapshot: Types.Timeline) => {
      const timelineModel: Timeline = TimelineModelFromData(timelineSnapshot)

      self.timelines.put(timelineModel)
    }
  }))
  // Following actions will send requests to the API, and call actions defined in the first action definition
  .actions(self => ({
    getTimelinesByUser: flow(function * (userId: number) {
      const result: Types.GetTimelinesResult = yield self.environment.api.getTimelinesByUser(userId)

      if (result.kind === "ok") {
        self.addTimelinesToStore(result.timelines)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
    getAllTimelines: flow(function * () {
      const result: Types.GetTimelinesResult = yield self.environment.api.getAllTimelines()

      if (result.kind === "ok") {
        self.addTimelinesToStore(result.timelines)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
    updateTimeline: flow(function * (timeline) { // FIXME: Add correct type for timeline
      const result: Types.PostTimelineResult = yield self.environment.api.updateTimeline(timeline)

      if (result.kind === "ok") {
        self.updateTimelineInStore(result.timeline)
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

type TimelineStoreType = Instance<typeof TimelineStoreModel>
export interface TimelineStore extends TimelineStoreType {}
type TimelineStoreSnapshotType = SnapshotOut<typeof TimelineStoreModel>
export interface TimelineStoreSnapshot extends TimelineStoreSnapshotType {}
