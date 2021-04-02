import { UiStoreModel } from "../ui-store/ui-store"
import { TimelineStoreModel } from "../timeline-store/timeline-store"
import { UserStoreModel } from "../user-store/user-store"
import { types } from "mobx-state-tree"
/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
    uiStore: types.optional(UiStoreModel, { theme: 'dark' }),
    timelineStore: types.optional(TimelineStoreModel, {}),
    userStore: types.optional(UserStoreModel, {})
});
//# sourceMappingURL=root-store.js.map
