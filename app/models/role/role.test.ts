import { Role, RoleModel } from './role'

test('can be created', () => {
  const instance: Role = RoleModel.create({})

  expect(instance).toBeTruthy()
})
