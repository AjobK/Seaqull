import { types } from 'mobx-state-tree'

const TestStore = types
  .model('PagesStore', {
    pieceOfText: types.optional(types.string, 'Athena')
  })
  .actions(self => ({
    reset () {
      self.pieceOfText = 'Reset'
    }
  }))

export default TestStore