import { types } from 'mobx-state-tree'
import Axios from 'axios'

const ProfileStore = types
  .model('ProfileStore', {
    role: types.optional(types.string, 'user'),
    loggedIn: types.optional(types.boolean, false),
    display_name: types.optional(types.string, 'NONE'),
    title: types.optional(types.string, 'NONE'),
    avatarURL: types.optional(types.string, 'NONE')

  })
  .actions((self) => ({
    loginVerify() {
      Axios.defaults.baseURL = 'http://localhost:8000'
  
      Axios.get(`/api/login-verify`, { withCredentials: true })
      .then((res) => {
        self.setLoggedIn(true)
        self.setRole(res.data.profile.role)
        self.setDisplayName(res.data.profile.display_name)
      })
      .catch((e) => {
        self.setLoggedIn(false)
      })
    },
    setRole(role) {
      self.role = role
    },
    setLoggedIn(loggedIn) {
      self.loggedIn = loggedIn
    },
    setDisplayName(display_name) {
      self.display_name = display_name
    },
    setAvatarURL(avatarURL) {
      self.avatarURL = avatarURL
    },
    setTitle(title) {
      self.title = title
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
