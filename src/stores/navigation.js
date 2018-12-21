import { types } from 'mobx-state-tree'

const menuItems = () => {
    return ({
        'log in': '/login',
        'sign up': '/signup'
    })
}

const NavigationStore = types
  .model('NavigationStore', {
    menuItems: types.optional(types.frozen, menuItems())
  })
  .actions(self => ({
    reset () {
      self.menuItems = menuItems()
    }
  }))

export default NavigationStore