import { types } from 'mobx-state-tree'

const DefaultDataStore = types
  .model('DefaultDataStore', {
    projectName: types.optional(types.string, 'Seaqull'),
    backendUrl: types.optional(types.string, 'http://api.seaqull.com:80')
  })
  .actions(self => ({
    reset() {
      self.projectName = 'Seaqull'
    }
  }))

export default DefaultDataStore
