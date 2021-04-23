import { Instance, SnapshotOut, types } from 'mobx-state-tree'

/**
 * Model description here for TypeScript hints.
 */
export const RoleModel = types
  .model('Role')
  .props({
    id: types.identifierNumber,
    name: types.string,
    description: types.string,
    type: types.enumeration(['authenticated', 'public']),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type RoleType = Instance<typeof RoleModel>
export interface Role extends RoleType {}
type RoleSnapshotType = SnapshotOut<typeof RoleModel>
export interface RoleSnapshot extends RoleSnapshotType {}
