import { types } from 'mobx-state-tree'

const NavigationStore = types
  .model('NavigationStore', {
    menuItemsLoggedIn: types.optional(types.frozen(), [
      {title: 'home', href: '/'},
      {title: 'profile', href: '/profile'},
      {title: 'about', href: '/about'},
      {title: 'contact', href: '/contact'},
    ]),
    menuItemsLoggedOut: types.optional(types.frozen(), [
      {title: 'home', href: '/'},
      {title: 'log in', href: '/login'},
      {title: 'sign up', href: '/signup'},
      {title: 'about', href: '/about'},
      {title: 'contact', href: '/contact'},
    ])
  })
  .actions(self => ({
    reset () {
      self.menuItemsLoggedIn = [{}],
      self.menuItemsLoggedOut = [{}]
    }
  }))

export default NavigationStore
