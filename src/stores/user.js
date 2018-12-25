import { types } from 'mobx-state-tree'

const UserStore = types
  .model('UserStore', {
    loggedIn: types.optional(types.boolean, false)
  })
  .actions(self => ({
    reset () {
      self.loggedIn = false
    }
  }))

export default UserStore