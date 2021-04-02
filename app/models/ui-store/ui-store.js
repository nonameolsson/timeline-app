import { types } from "mobx-state-tree"
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
      self.theme = "dark"
    },
    setLightTheme: () => {
      self.theme = "light"
    },
    toggleTheme: () => {
      if (self.theme === "light") {
        self.theme = "dark"
      } else {
        self.theme = "light"
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
//# sourceMappingURL=ui-store.js.map
