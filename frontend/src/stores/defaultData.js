import { types } from 'mobx-state-tree'

const { BACKEND_URL } = process.env

const DefaultDataStore = types
  .model('DefaultDataStore', {
    projectName: types.optional(types.string, 'Seaqull'),
    backendUrl: types.optional(types.string, `${ BACKEND_URL }/api`),
    backendUrlBase: types.optional(types.string, BACKEND_URL)
  })
  .actions((self) => ({
    reset() {
      self.projectName = 'Seaqull'
    }
  }))

export default DefaultDataStore
