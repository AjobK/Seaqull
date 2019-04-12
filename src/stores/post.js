import { types } from 'mobx-state-tree'

const PostStore = types
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
