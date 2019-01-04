import { types } from 'mobx-state-tree'

const NavigationStore = types
  .model('NavigationStore', {
    menuItemsLoggedIn: types.optional(types.frozen(), {
      home: {
        ref: '/',
        icon: 'home'
      },
      personal: {
        children: [
          {title: 'profile', ref: '/profile'},
          {title: 'notifications', ref: '/notifications'},
          {title: 'favorite posts', ref: '/favorite-posts'},
          {title: 'create post', ref: '/create-post'},
          {title: 'settings', ref: '/settings'}
        ],
        icon: 'user'
      },
      general: {
        children: [
          {title: 'about', ref: '/about'},
          {title: 'contact', ref: '/contact'}
        ],
        icon: 'th'
      },
      logout: {
        ref: '/logout',
        icon: 'sign-out-alt'
      }
    }),
    menuItemsLoggedOut: types.optional(types.frozen(), {
      home: {
        ref: '/',
        icon: 'home'
      },
      general: {
        children: [
          {title: 'about', ref: '/about'},
          {title: 'contact', ref: '/contact'},
        ],
        icon: 'th'
      },
      'log in': {
        ref: '/login',
        icon: 'sign-in-alt'
      },
      'sign up': {
        ref: '/signup',
        icon: 'users'
      }
    })
  })
  .actions(self => ({
    reset () {
      self.menuItemsLoggedIn = [{}],
      self.menuItemsLoggedOut = [{}]
    }
  }))

export default NavigationStore
