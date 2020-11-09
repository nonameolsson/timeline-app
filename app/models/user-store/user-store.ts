import { Instance, SnapshotOut, types, flow, getRoot } from "mobx-state-tree"
import { UserModel, UserSnapshot } from "../user/user"
import { withEnvironment } from "../extensions/with-environment"
import { User, GetUserResult, GetLoginResult } from "../../services/api"
import { RootStore } from ".."

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
  .views(self => ({
    isLoggedIn: () => {
      return !!self.jwt
    },
  }))
  .actions(self => ({
    resetStore: () => {
      self.jwt = null
      self.user = null
    },
    saveJwt: (jwt: string) => {
      self.jwt = jwt
      self.environment.api.apisauce.setHeader("Authorization", `Bearer ${jwt}`)
    },
    saveUser: (userSnapshot: UserSnapshot) => {
      const userModel: User = UserModel.create(userSnapshot) // create model instances from the plain objects
      self.user = userModel // Replace the existing data with the new data
    },
  }))
  .actions(self => ({
    logOut: () => {
      const root = getRoot<RootStore>(self)

      // Empty stores
      self.resetStore()
      root.timelineStore.resetStore()

      // Reset Apisauce
      self.environment.api.apisauce.deleteHeader("Authorization")
    },
    login: flow(function*(identifier: string, password: string) {
      const result: GetLoginResult = yield self.environment.api.login(identifier, password)

      if (result.kind === "ok") {
        self.saveUser(result.data.user)
        self.saveJwt(result.data.jwt)
        self.environment.api.apisauce.setHeader("Authorization", `Bearer ${result.data.jwt}`)
      } else {
        __DEV__ && console.tron.log(result.kind)
        return result
      }
    }),
    getUser: flow(function*(user: number) {
      const result: GetUserResult = yield self.environment.api.getUser(user)

      if (result.kind === "ok") {
        self.saveUser(result.user)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
