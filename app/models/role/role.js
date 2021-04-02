import { types } from "mobx-state-tree";
/**
 * Model description here for TypeScript hints.
 */
export const RoleModel = types
    .model("Role")
    .props({
    id: types.identifierNumber,
    name: types.string,
    description: types.string,
    type: types.enumeration(["authenticated", "public"]),
})
    .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
    .actions((self) => ({})); // eslint-disable-line @typescript-eslint/no-unused-vars
//# sourceMappingURL=role.js.map