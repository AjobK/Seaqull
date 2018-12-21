import { types } from 'mobx-state-tree'

const DefaultDataStore = types
  .model('DefaultDataStore', {
    projectName: types.optional(types.string, 'Athena')
  })
  .actions(self => ({
    reset () {
      self.projectName = 'Reset'
    }
  }))

export default DefaultDataStore