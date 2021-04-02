import { getRoot } from "mobx-state-tree";
/**
 * Adds a rootStore property to the node for a convenient
 * and strongly typed way for stores to access other stores.
 */
export const withRootStore = (self) => ({
    views: {
        /**
         * The root store.
         */
        get rootStore() {
            return getRoot(self);
        },
    },
});
//# sourceMappingURL=with-root-store.js.map