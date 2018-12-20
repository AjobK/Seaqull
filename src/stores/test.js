import { types } from 'mobx-state-tree'

const TestStore = types
  .model('PagesStore', {
    pieceOfText: types.optional(types.string, 'MOBX WORKING')
  })
  .actions(self => ({
    reset () {
      self.pieceOfText = 'MOBX WORKING'
    }
  }))

export default TestStore