import { types } from 'mobx-state-tree'

const NavigationStore = types
  .model('NavigationStore', {
    menuItems: types.optional(types.boolean, true)
  })
  .actions(self => ({
    reset () {
      self.menuItems = true
    }
  }))

export default NavigationStore
