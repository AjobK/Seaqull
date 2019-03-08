import { types } from 'mobx-state-tree'

const UserStore = types
  .model('UserStore', {
    loggedIn: types.optional(types.boolean, true),
    picture: types.optional(types.string, '../src/static/dummy/user/profile.jpg'),
    banner: types.optional(types.string, '../src/static/dummy/user/banner.jpg'),
    name: types.optional(types.string, 'Emily Washington Three'),
    role: types.optional(types.string, 'Software Engineer First In The Galaxy Good Sir'),
    level: types.optional(types.integer, 12),
    percentage: types.optional(types.number, 10)
  })
  .actions(self => ({
    logOut() {
      self.loggedIn = false
    },
    logIn() {
      self.loggedIn = true
    }
  }))

export default UserStore
