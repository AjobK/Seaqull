import { types } from 'mobx-state-tree'

const NavigationStore = types
  .model('NavigationStore', {
    menuItemsLoggedIn: types.optional(types.frozen(), {
      home: '/',
      personal: [
        {title: 'profile', href: '/profile'},
        {title: 'notifications', href: '/notifications'},
        {title: 'favorite posts', href: '/favorite-posts'},
        {title: 'create post', href: '/create-post'},
        {title: 'settings', href: '/settings'}
      ],
      general: [
        {title: 'about', href: '/about'},
        {title: 'contact', href: '/contact'},
      ],
      'logout': '/logout'
    }),
    menuItemsLoggedOut: types.optional(types.frozen(), {
      home: '/',
      general: [
        {title: 'about', href: '/about'},
        {title: 'contact', href: '/contact'},
      ],
      'log in': '/login',
      'sign up': '/signup'
    })
  })
  .actions(self => ({
    reset () {
      self.menuItemsLoggedIn = [{}],
      self.menuItemsLoggedOut = [{}]
    }
  }))

export default NavigationStore
