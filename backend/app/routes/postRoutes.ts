import * as express from 'express'
import PostController from '../controllers/postController'
import RouterBase from '../interfaces/RouterBase'

const auth = require('../middlewares/isAuth.ts')
const hasPostPermission = require('../middlewares/hasPostPermission.ts')

class PostRoutes implements RouterBase {
  public post = '/post'
  public router = express.Router()
  private postController: PostController

  constructor() {
    this.postController = new PostController()
    this.initRoutes()
  }

  public initRoutes(): void {
    this.router.get(this.post, this.postController.getPosts)
    this.router.get(this.post + '/:path', this.postController.getPostByPath)
    this.router.put(this.post + '/:path', auth, this.postController.updatePost)
    this.router.post(this.post, auth, this.postController.createPost)

    this.router.get(this.post + '/owned-by/:username', this.postController.getOwnedPosts)

    this.router.post(this.post + '/like/:path', auth, this.postController.likePost)
    this.router.delete(this.post + '/like/:path', auth, this.postController.unlikePost)
    this.router.get(this.post + '/like/:path', this.postController.getPostLikes)
    this.router.get(this.post + '/liked-by/recent/:username', this.postController.getRecentUserLikes)
    this.router.put(this.post + '/:path', auth, this.postController.updatePost)
    this.router.put(this.post + '/archive/:path', auth, hasPostPermission, this.postController.archivePost)
    this.router.post(this.post + '/view', this.postController.addViewToPost)
    this.router.get(this.post + '/view/:path', this.postController.getPostViewCount)
  }
}

export default PostRoutes
