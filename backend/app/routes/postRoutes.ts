import * as express from 'express'
import PostService from '../controllers/postController'
import RouterBase from '../interfaces/RouterBase'
import FileService from '../utils/fileService'

const auth = require('../middlewares/isAuth.ts')
const hasPostPermission = require('../middlewares/hasPostPermission.ts')

class PostRoutes implements RouterBase {
  public post = '/post'
  public router = express.Router()
  private postService: PostService
  private upload
  private POST_OWNER = 'POST_OWNER'
  private ROLE_PERMISSIONS = 'ROLE_PERMISSIONS'

  constructor() {
    this.postService = new PostService()
    this.upload = new FileService().getUpload()

    this.initRoutes()
  }

  public initRoutes(): void {
    this.router.get(this.post, this.postService.getPosts)
    this.router.get(this.post + '/:path', this.postService.getPostByPath)
    this.router.get(this.post + '/like/:path', this.postService.getPostLikes)
    this.router.get(this.post + '/view/:path', this.postService.getPostViewCount)
    this.router.get(this.post + '/owned-by/:username', this.postService.getOwnedPosts)
    this.router.get(this.post + '/thumbnail/default', this.postService.getPostDefaultThumbnailURL)
    this.router.get(this.post + '/liked-by/recent/:username', this.postService.getRecentUserLikes)

    this.router.post(this.post, auth, this.postService.createPost)
    this.router.post(this.post + '/view', this.postService.addViewToPost)
    this.router.post(this.post + '/like/:path', auth, this.postService.likePost)
    this.router.post(this.post, auth, this.upload.single('file'), this.postService.createPost)

    this.router.put(this.post + '/:path', auth, this.postService.updatePost)
    this.router.put(this.post + '/:path', auth, this.postService.updatePost)
    this.router.put(this.post + '/archive/:path',
      auth, hasPostPermission([this.POST_OWNER, this.ROLE_PERMISSIONS]),
      this.postService.archivePost
    )
    this.router.put(this.post + '/thumbnail/:path',
      auth, hasPostPermission([this.POST_OWNER]), this.upload.single('file'),
      this.postService.updatePostThumbnail
    )
  }
}

export default PostRoutes
