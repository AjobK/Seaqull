import { types } from 'mobx-state-tree'

const DefaultDataStore = types
  .model('DefaultDataStore', {
    projectName: types.optional(types.string, 'Seaqull')
  })
  .actions(self => ({
    reset () {
      self.projectName = 'Athena'
    }
  }))

export default DefaultDataStore