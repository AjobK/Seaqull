import { types } from 'mobx-state-tree'

const UserStore = types
  .model('UserStore', {
    loggedIn: types.optional(types.boolean, true),
    name: types.optional(types.string, 'Elomin'),
    role: types.optional(types.string, 'Best Developer'),
    level: types.optional(types.string, '10'),
    percentage: types.optional(types.string, '66') // Percentage
  })
  .actions(self => ({
    logOut () {
      self.loggedIn = false
    },
    logIn () {
      self.loggedIn = true
    },
  }))

export default UserStore