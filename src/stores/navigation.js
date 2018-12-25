import { types } from 'mobx-state-tree'

const NavigationStore = types
  .model('NavigationStore', {
    menuItems: types.optional(types.frozen(), [
      {title: 'home', href: '/'},
      {title: 'about', href: '/about'},
      {title: 'log in', href: '/login'},
      {title: 'sign up', href: '/signup'},
    ])
  })
  .actions(self => ({
    reset () {
      self.menuItems = [{}]
    }
  }))

export default NavigationStore
