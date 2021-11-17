import * as express from 'express'
import PostController from '../controllers/postController'
import RouterBase from '../interfaces/RouterBase'
import FileService from '../utils/fileService'

const auth = require('../middlewares/isAuth.ts')
const hasPostPermission = require('../middlewares/hasPostPermission.ts')

class PostRoutes implements RouterBase {
  public post = '/post'
  public router = express.Router()
  private postController: PostController
  private upload
  private POST_OWNER = 'POST_OWNER'
  private ROLE_PERMISSIONS = 'ROLE_PERMISSIONS'

  constructor() {
    this.postController = new PostController()
    this.upload = new FileService().getUpload()

    this.initRoutes()
  }

  public initRoutes(): void {
    this.router.get(this.post, this.postController.getPosts)
    this.router.get(this.post + '/:path', this.postController.getPostByPath)
    this.router.put(this.post + '/:path', auth, this.postController.updatePost)
    this.router.post(this.post, auth, this.upload.single('file'), this.postController.createPost)

    this.router.get(this.post + '/owned-by/:username', this.postController.getOwnedPosts)

    this.router.post(this.post + '/like/:path', auth, this.postController.likePost)
    this.router.delete(this.post + '/like/:path', auth, this.postController.unlikePost)
    this.router.get(this.post + '/like/:path', this.postController.getPostLikes)
    this.router.get(this.post + '/liked-by/recent/:username', this.postController.getRecentUserLikes)
    this.router.put(this.post + '/:path', auth, this.postController.updatePost)
    this.router.put(this.post + '/archive/:path',
      auth, hasPostPermission([this.POST_OWNER, this.ROLE_PERMISSIONS]),
      this.postController.archivePost
    )
    this.router.post(this.post + '/view', this.postController.addViewToPost)
    this.router.get(this.post + '/view/:path', this.postController.getPostViewCount)
    this.router.put(this.post + '/thumbnail/:path',
      auth, hasPostPermission([this.POST_OWNER]), this.upload.single('file'),
      this.postController.updatePostThumbnail
    )
    this.router.get(this.post + '/thumbnail/default', this.postController.getPostDefaultThumbnailURL)
  }
}

export default PostRoutes
