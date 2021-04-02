import { types, flow, getRoot } from "mobx-state-tree";
import { UserModel } from "../user/user";
import { withEnvironment } from "../extensions/with-environment";
/**
 * Model description here for TypeScript hints.
 */
export const UserStoreModel = types
    .model("UserStore")
    .props({
    jwt: types.maybeNull(types.string),
    user: types.maybeNull(UserModel),
})
    .extend(withEnvironment)
    .views((self) => ({
    isLoggedIn: () => {
        return !!self.jwt;
    },
}))
    .actions((self) => ({
    resetStore: () => {
        self.jwt = null;
        self.user = null;
    },
    saveJwt: (jwt) => {
        self.jwt = jwt;
        self.environment.api.apisauce.setHeader("Authorization", `Bearer ${jwt}`);
    },
    saveUser: (userSnapshot) => {
        const userModel = UserModel.create(userSnapshot); // create model instances from the plain objects
        self.user = userModel; // Replace the existing data with the new data
    },
}))
    .actions((self) => ({
    logOut: () => {
        const root = getRoot(self);
        // Empty stores
        self.resetStore();
        root.timelineStore.resetStore();
        // Reset Apisauce
        self.environment.api.apisauce.deleteHeader("Authorization");
    },
    login: flow(function* (identifier, password) {
        const result = yield self.environment.api.login(identifier, password);
        if (result.kind === "ok") {
            self.saveUser(result.data.user);
            self.saveJwt(result.data.jwt);
            self.environment.api.apisauce.setHeader("Authorization", `Bearer ${result.data.jwt}`);
        }
        else {
            __DEV__ && console.tron.log(result.kind);
            return result;
        }
    }),
    getUser: flow(function* (user) {
        const result = yield self.environment.api.getUser(user);
        if (result.kind === "ok") {
            self.saveUser(result.data.user);
        }
        else {
            __DEV__ && console.tron.log(result.kind);
        }
    }),
})); // eslint-disable-line @typescript-eslint/no-unused-vars
//# sourceMappingURL=user-store.js.map