import { types } from 'mobx-state-tree'
import Axios from 'axios'

const ProfileStore = types
  .model('ProfileStore', {
    loaded: types.optional(types.string, 'Nooooo'),
    loggedIn: types.optional(types.boolean, false)
  })
  .actions((self) => ({
    loginVerify() {
      Axios.defaults.baseURL = 'http://localhost:8000'
  
      Axios.get(`/api/login-verify`, { withCredentials: true })
      .then((res) => {
        self.setLoggedIn(true)
      })
      .catch((e) => {
        self.setLoggedIn(false)
      })
    },
    setLoggedIn(loggedIn) {
      self.loggedIn = loggedIn
    }
  }))

export default ProfileStore
