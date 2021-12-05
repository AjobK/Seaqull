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
        icon: 'UserCircle'
      },
      'create post': {
        ref: '/new-post',
        icon: 'Pen'
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
        ref: '/register',
        icon: 'Users'
      }
    })
  })
  .actions((self) => ({
    reset() {
      self.menuItemsLoggedIn = [{}],
      self.menuItemsLoggedOut = [{}]
    }
  }))

export default NavigationStore
