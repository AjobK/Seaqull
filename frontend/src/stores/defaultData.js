import { types } from 'mobx-state-tree'

const DefaultDataStore = types
  .model('DefaultDataStore', {
    projectName: types.optional(types.string, 'Seaqull'),
    backendUrl: types.optional(types.string, 'http://localhost:8000/api'),
    backendUrlBase: types.optional(types.string, 'http://localhost:8000'),
    recaptchaSiteKey: types.optional(types.string, '6LftMdccAAAAAP7p-cvb9c68hz0ss_bkBB68yv5c')
  })
  .actions((self) => ({
    reset() {
      self.projectName = 'Seaqull'
    }
  }))

export default DefaultDataStore
