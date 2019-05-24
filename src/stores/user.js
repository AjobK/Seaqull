import { types } from 'mobx-state-tree'

const Posts = types
  .model('Posts', {
    title: types.string
  })

const UserStore = types
  .model('UserStore', {
    isOwner: types.optional(types.boolean, false),
    picture: types.optional(types.string, '/src/static/dummy/user/profile.jpg'),
    banner: types.optional(types.string, '/src/static/dummy/user/banner.jpg'),
    name: types.optional(types.string, 'Emily Washington'),
    title: types.optional(types.string, 'Software Engineer'),
    level: types.optional(types.integer, 12),
    percentage: types.optional(types.number, 10),
    posts: types.optional(types.array(Posts), [{ title: 'Testpost' }]),
    path: types.optional(types.string, 'timon')
  })
  .actions(self => ({
    setIsOwner(isOnwer) {
      self.isOnwer = isOnwer
    },
    setPosts(posts) {
      self.posts = posts;
    },
    setName(name) {
      self.name = name;
    },
    setTitle(title) {
      self.title = title;
    },
    setLevel(level) {
      self.level = level;
    }
  }))

export default UserStore
