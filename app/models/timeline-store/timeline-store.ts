import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { GetTimelinesResult } from "services/api"
import { TimelineSnapshot, Timeline, TimelineModel } from "../timeline/timeline"

/**
 * Model description here for TypeScript hints.
 */
export const TimelineStoreModel = types
  .model("TimelineStore")
  .props({
    timelines: types.optional(types.array(TimelineModel), [])
  })
  .extend(withEnvironment)
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    saveTimelines: (timelineSnapshot: TimelineSnapshot[]) => {
      const timelinesModel: Timeline[] = timelineSnapshot.map(timeline => TimelineModel.create(timeline))
      self.timelines.replace(timelinesModel)
    }
  }))
  .actions(self => ({
    getTimelines: flow(function * () {
      const result: GetTimelinesResult = yield self.environment.api.getTimelines()
      if (result.kind === "ok") {
        self.saveTimelines(result.timelines)
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
