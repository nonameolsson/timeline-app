import { UiStoreModel } from "../ui-store/ui-store"
import { TimelineStoreModel } from "../timeline-store/timeline-store"
import { UserStoreModel } from "../user-store/user-store"
import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  uiStore: types.optional(UiStoreModel, { theme: 'dark' }),
  timelineStore: types.optional(TimelineStoreModel, {}),
  userStore: types.optional(UserStoreModel, {})
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
