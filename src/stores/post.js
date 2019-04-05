import { types } from 'mobx-state-tree'

const PostStore = types
  .model('PostStore', {
    loggedIn: types.optional(types.boolean, true),
    picture: types.optional(types.string, '../src/static/dummy/post/profile.jpg'),
    banner: types.optional(types.string, '../src/static/dummy/post/banner.jpg'),
    name: types.optional(types.string, 'John Doe'),
    role: types.optional(types.string, 'Best Developer'),
    level: types.optional(types.integer, 91),
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
