import { types } from 'mobx-state-tree'
import Axios from 'axios'

const ProfileStore = types
  .model('ProfileStore', {
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
        this.setProfileData(res.data)
      })
      .catch((e) => {
        self.setLoggedIn(false)
      })
    },
    setProfileData(data) {
      const { profile, loggedIn } = data

      self.setLoggedIn(loggedIn)
      self.setDisplayName(profile.display_name)
      self.setAvatarURL(`http://localhost:8000/${profile.avatar_attachment.path}`)
      self.setTitle(profile.title.name)
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
