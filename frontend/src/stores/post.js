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
    percentage: types.optional(types.number, 8),
    isOwner: true // This singular line will be used in production. It tells us if the currently viewed post is owned by the user
  })
  .actions(self => ({
    setEditingElement(element) {
      this.editingElement = element
    },
    getPostByPath(path) {
    
    }
  }))

export default PostStore
