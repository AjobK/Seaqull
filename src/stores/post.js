import { types } from 'mobx-state-tree'

const PostStore = types
  // **WARNING**
  // This store is only used for dummy data since the back-end is not
  // yet linked with the front-end. Do not use this in production!
  .model('PostStore', {
    picture: types.optional(types.string, '../src/static/dummy/post/profile.jpg'),
    banner: types.optional(types.string, '../src/static/dummy/post/banner.jpg'),
    name: types.optional(types.string, 'Matt Seamore'),
    role: types.optional(types.string, 'Software Engineer'),
    level: types.optional(types.integer, 23),
    percentage: types.optional(types.number, 8)
  })
  .actions(self => ({
    logOut() {
      self.loggedIn = false
    },
    logIn() {
      self.loggedIn = true
    }
  }))

export default PostStore
