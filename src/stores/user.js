import { types } from 'mobx-state-tree'

const defaults = {
  id: 0,
  username: '',
  handleAuth: true,
  isLoggedIn: true
}

const AuthStore = types
  .model('AuthStore', {
    id: types.optional(types.integer, defaults.id),
    username: types.optional(types.string, defaults.username),
    handleAuth: types.optional(types.boolean, defaults.handleAuth),
    isLoggedIn: types.optional(types.boolean, defaults.isLoggedIn)
  })
  .actions(self => ({
    reset () {
      self.id = defaults.id
      self.username = defaults.username
      self.handleAuth = defaults.handleAuth
    },
    login () {
      self.isLoggedIn = true
    },
    logout () {
      self.isLoggedIn = false
    }
  }))

export default AuthStore
