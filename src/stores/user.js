import { types } from 'mobx-state-tree'

const UserStore = types

  .model('UserStore', {
    loggedIn: types.optional(types.boolean, localStorage.user == null ? false : true),
    picture: types.optional(types.string, '../src/static/dummy/user/profile.jpg'),
    banner: types.optional(types.string, '../src/static/dummy/user/banner.jpg'),
    name: types.optional(types.string, localStorage.user == null ? '' : JSON.parse(localStorage.user).name),
    role: types.optional(types.string, 'Software Engineer'),
    level: types.optional(types.integer, 12),
    percentage: types.optional(types.number, 10)
  })
  .actions(self => ({
    logOut() {
      self.loggedIn = false
      localStorage.clear();
      
    },
    logIn() {
      self.loggedIn = true
    },
    fillUserData(user = null) {
      self.loggedIn = !!user
      if (user) {
        self.name = user.name || self.name
      }
    },
  }))

export default UserStore
