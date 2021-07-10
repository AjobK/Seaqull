import { flow, types } from 'mobx-state-tree'
import Axios from 'axios'

const ProfileStore = types
  .model('ProfileStore', {
    loaded: types.optional(types.boolean, false),
    loggedIn: types.optional(types.boolean, false),
    display_name: types.optional(types.string, 'Emily Washington')

  })
  .actions((self) => ({
    loginVerify: flow(function* loginVerfiy() {
      Axios.defaults.baseURL = 'http://localhost:8000'
  
      yield Axios.get(`/api/login-verify`, { withCredentials: true })
      .then((res) => {
        self.setLoggedIn(true)
        self.setDisplayName(res.data.profile.display_name)
      })
      .catch((e) => {
        console.log('error', e)
        self.setLoggedIn(false)
      })
    }),
    setLoaded(loaded) {
      self.loaded = loaded
    },
    setLoggedIn(loggedIn) {
      self.loaded = true
      self.loggedIn = loggedIn
    },
    setDisplayName(display_name) {
      self.display_name = display_name
    },
    logOut() {
      Axios.defaults.baseURL = 'http://localhost:8000'

      Axios.get('/api/logout', { withCredentials: true })
      .then(() => {
        self.setLoggedIn(false)
      })
    }
  }))

export default ProfileStore
