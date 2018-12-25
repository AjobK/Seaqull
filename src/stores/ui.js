import { types } from 'mobx-state-tree'

const UIStore = types
  .model('UIStore', {
    subNavOpen: types.optional(types.boolean, true)
  })
  .actions(self => ({
    reset () {
      self.subNavOpen = false
    },
    toggleSubNav () {
      self.subNavOpen = !self.subNavOpen
    }
  }))

export default UIStore
