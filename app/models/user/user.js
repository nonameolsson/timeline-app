/* eslint-disable @typescript-eslint/camelcase */
import { types } from "mobx-state-tree";
import { RoleModel } from "../role/role";
/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
    .model("User")
    .props({
    id: types.identifierNumber,
    username: types.string,
    email: types.string,
    provider: types.string,
    confirmed: types.boolean,
    blocked: types.boolean,
    role: types.maybe(RoleModel),
    created_at: types.string,
    updated_at: types.string,
})
    .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
    .actions((self) => ({})); // eslint-disable-line @typescript-eslint/no-unused-vars
//# sourceMappingURL=user.js.map