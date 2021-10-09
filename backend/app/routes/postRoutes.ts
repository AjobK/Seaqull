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

  constructor() {
    this.postService = new PostService()
    this.upload = new FileService().getUpload()
    this.initRoutes()
  }

  public initRoutes(): void {
    this.router.get(this.post, this.postService.getPosts)
    this.router.get(this.post + '/:path', this.postService.getPostByPath)
    this.router.put(this.post + '/:path', auth, this.postService.updatePost)
    this.router.post(this.post, auth, this.upload.single('file'), this.postService.createPost)

    this.router.get(this.post + '/owned-by/:username', this.postService.getOwnedPosts)

    this.router.post(this.post + '/like/:path', auth, this.postService.likePost)
    this.router.delete(this.post + '/like/:path', auth, this.postService.unlikePost)
    this.router.get(this.post + '/like/:path', this.postService.getPostLikes)
    this.router.get(this.post + '/liked-by/recent/:username', this.postService.getRecentUserLikes)
    this.router.put(this.post + '/:path', auth, this.postService.updatePost)
    this.router.put(this.post + '/archive/:path', auth, hasPostPermission, this.postService.archivePost)
    this.router.post(this.post + '/view', this.postService.addViewToPost)
    this.router.get(this.post + '/view/:path', this.postService.getPostViewCount)
    this.router.put(this.post + '/thumbnail/:path',
      auth, hasPostPermission, this.upload.single('file'),
      this.postService.updatePostThumbnail
    )
    this.router.get(this.post + '/thumbnail/default', this.postService.getPostDefaultThumbnailURL)
  }
}

export default PostRoutes
