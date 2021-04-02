import { observable } from "mobx";
/**
 * Adds a status field to the model often for tracking api access.
 *
 * This property is a string which can be observed, but will not
 * participate in any serialization.
 *
 * Use this to extend your models:
 *
 * ```ts
 *   types.model("MyModel")
 *     .props({})
 *     .actions(self => ({}))
 *     .extend(withStatus) // <--- time to shine baby!!!
 * ```
 *
 * This will give you these 3 options:
 *
 *   .status            // returns a string
 *   .status = "done"   // change the status directly
 *   .setStatus("done") // change the status and trigger an mst action
 */
export const withStatus = () => {
    /**
     * The observable backing store for the status field.
     */
    const status = observable.box("idle");
    return {
        views: {
            // a getter
            get status() {
                return status.get();
            },
            // as setter
            set status(value) {
                status.set(value);
            },
        },
        actions: {
            /**
             * Set the status to something new.
             *
             * @param value The new status.
             */
            setStatus(value) {
                status.set(value);
            },
        },
    };
};
//# sourceMappingURL=with-status.js.map