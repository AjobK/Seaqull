import { types } from 'mobx-state-tree'
import homepage from '../../data/homePage.json'
import aboutpage from '../../data/aboutPage.json'

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