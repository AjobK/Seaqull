import { types } from 'mobx-state-tree'

const NavigationStore = types
  .model('NavigationStore', {
    menuItemsLoggedIn: types.optional(types.frozen(), {
      home: {
        ref: '/',
        icon: 'home'
      },
      personal: {
        ref: '/',
        icon: 'user'
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
