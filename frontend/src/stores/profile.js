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
      const { BACKEND_URL } = process.env
      Axios.defaults.baseURL = BACKEND_URL

      Axios.get('/api/login-verify', { withCredentials: true })
        .then((res) => {
          this.setProfileData(res.data)
        })
        .catch(() => {
          self.setLoggedIn(false)
        })
    },
    setProfileData(data) {
      const { profile } = data
      const { BACKEND_URL } = process.env

      self.setLoggedIn(true)
      self.setDisplayName(profile.display_name)
      self.setAvatarURL(`${ BACKEND_URL }/${ profile.avatar_attachment.path }`)
      self.setTitle(profile.title.name)
      self.setRole(profile.role)
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
    setRole(role) {
      self.role = role
    },
    logOut() {
      const { BACKEND_URL } = process.env
      Axios.defaults.baseURL = BACKEND_URL

      Axios.get('/api/logout', { withCredentials: true })
        .then(() => {
          self.setLoggedIn(false)
        })
    }
  }))

export default ProfileStore
