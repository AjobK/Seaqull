import { types } from 'mobx-state-tree'

const DefaultDataStore = types
  .model('DefaultDataStore', {
    projectName: types.optional(types.string, 'Seaqull'),
    backendUrl: types.optional(types.string, 'http://localhost:8000/api')
  })
  .actions(self => ({
    reset() {
      self.projectName = 'Seaqull'
    }
  }))

export default DefaultDataStore
