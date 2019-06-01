import { types } from 'mobx-state-tree'

const UserStore = types
  .model('UserStore', {
    loggedIn: types.optional(types.boolean, localStorage.user == null ? false : true),
    picture: types.optional(types.string, '../src/static/dummy/user/profile.jpg'),
    banner: types.optional(types.string, '../src/static/dummy/user/banner.jpg'),
    username: types.optional(types.string, 'Null'),
    role: types.optional(types.string, 'Null'),
    level: types.optional(types.integer, 12),
    percentage: types.optional(types.number, 10)
  })
  .actions(self => ({
    logOut() {
      self.loggedIn = false
      self.name = ''
    },
    logIn() {
      self.loggedIn = true
    },
    fillUserData(user = null) {
      if (user) {
        self.loggedIn = true
        self.username = user.username || self.username
      }
    }
  }))

export default UserStore
