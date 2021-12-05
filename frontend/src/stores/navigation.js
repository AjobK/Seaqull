import { types } from 'mobx-state-tree'

const NavigationStore = types
  .model('NavigationStore', {
    menuItemsLoggedIn: types.optional(types.frozen(), {
      home: {
        ref: '/',
        icon: 'Home'
      },
      profile: {
        ref: '/profile',
        icon: 'User'
      },
      logout: {
        ref: '/logout',
        icon: 'SignOutAlt'
      }
    }),
    menuItemsLoggedOut: types.optional(types.frozen(), {
      home: {
        ref: '/',
        icon: 'Home'
      },
      'log in': {
        ref: '/login',
        icon: 'SignInAlt'
      },
      'sign up': {
        ref: '/signup',
        icon: 'Users'
      }
    }),
    pathRedirectAfterLogin: types.optional(types.string, '')
  })
  .actions((self) => ({
    setPathRedirectAfterLogin(path) {
      self.pathRedirectAfterLogin = path
    },
    undoPathRedirectAfterLogin() {
      self.pathRedirectAfterLogin = ''
    },
    reset() {
      self.menuItemsLoggedIn = [{}]
      self.menuItemsLoggedOut = [{}]
      self.pathRedirectAfterLogin = ''
    }
  }))

export default NavigationStore
