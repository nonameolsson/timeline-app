import { getEnv } from "mobx-state-tree";
/**
 * Adds a environment property to the node for accessing our
 * Environment in strongly typed.
 */
export const withEnvironment = (self) => ({
    views: {
        /**
         * The environment.
         */
        get environment() {
            return getEnv(self);
        },
    },
});
//# sourceMappingURL=with-environment.js.map