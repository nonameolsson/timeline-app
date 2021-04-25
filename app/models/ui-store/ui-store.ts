import { Instance, SnapshotOut, types } from "mobx-state-tree";

/**
 * Model description here for TypeScript hints.
 */
export const UiStoreModel = types
  .model("UiStore")
  .props({
    theme: types.enumeration("Theme", ["light", "dark"]),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setDarkTheme: () => {
      self.theme = "dark";
    },

    setLightTheme: () => {
      self.theme = "light";
    },

    toggleTheme: () => {
      if (self.theme === "light") {
        self.theme = "dark";
      } else {
        self.theme = "light";
      }
    },
  })); // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type UiStoreType = Instance<typeof UiStoreModel>;
export interface UiStore extends UiStoreType {}
type UiStoreSnapshotType = SnapshotOut<typeof UiStoreModel>;
export interface UiStoreSnapshot extends UiStoreSnapshotType {}
