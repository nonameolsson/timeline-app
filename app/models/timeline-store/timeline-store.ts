import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { GetTimelinesResult } from "services/api"
import { TimelineSnapshot, Timeline, TimelineModel, TimelineModelFromData } from "../timeline/timeline"
import * as Types from "services/api/api.types"

/**
 * Model description here for TypeScript hints.
 */
export const TimelineStoreModel = types
  .model("TimelineStore")
  .props({
    timelines: types.array(TimelineModel)
  })
  .extend(withEnvironment)
  .views(self => ({
    getTimeline: (id: number) => {
      return self.timelines.find(timeline => timeline.id === id)
    },
  }))
  .actions(self => ({
    resetStore: () => {
      self.timelines.clear()
    },
    addTimelinesToStore: (timelineSnapshot: Types.Timeline[]) => {
      const timelinesModel: Timeline[] = timelineSnapshot.map(timeline => TimelineModelFromData(timeline))

      // timelinesModel.forEach(timeline => self.timelines.push(timeline))
      self.timelines.replace(timelinesModel) // NOTE: Offline data might be lost
    }
  }))
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
      const result: GetTimelinesResult = yield self.environment.api.getAllTimelines()

      if (result.kind === "ok") {
        self.addTimelinesToStore(result.timelines)
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
