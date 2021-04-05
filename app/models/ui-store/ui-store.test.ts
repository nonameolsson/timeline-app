import { UiStoreModel, UiStore } from './ui-store'

test('can be created', () => {
  const instance: UiStore = UiStoreModel.create({})

  expect(instance).toBeTruthy()
})
