import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { UserModel, UserSnapshot } from "../user/user"
import { withEnvironment } from "../extensions/with-environment"
import { User, GetUserResult } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
export const UserStoreModel = types
  .model("UserStore")
  .props({
    user: types.maybe(UserModel)
  })
  .extend(withEnvironment)
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    saveUser: (userSnapshot: UserSnapshot) => {
      const userModel: User = UserModel.create(userSnapshot) // create model instances from the plain objects
      self.user = userModel // Replace the existing data with the new data
    }
  }))
  .actions(self => ({
    getUser: flow(function * (user: number) {
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
