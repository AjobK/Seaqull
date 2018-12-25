import { types } from 'mobx-state-tree'

const UserStore = types
  .model('UserStore', {
    loggedIn: types.optional(types.boolean, true)
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