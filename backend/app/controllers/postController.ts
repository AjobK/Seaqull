import ControllerBase from '../interfaces/ControllerBase'
import * as express from 'express'
import PostService from '../service/postService'
const auth = require('../middleware/isAuth.ts')

class PostController implements ControllerBase{
    public post = '/post'
    public router = express.Router()
    private postService: PostService

    constructor(){
        this.postService = new PostService()
        this.initRoutes()
    }

    public initRoutes(): void {
        this.router.get(this.post, this.postService.getPosts)
        this.router.get(this.post + '/:path', this.postService.getPostByPath) 
        this.router.put(this.post + '/:path', auth, this.postService.updatePost)
        this.router.post(this.post, auth, this.postService.createPost)

        this.router.get(this.post + '/owned-by/:username', this.postService.getOwnedPosts)

        this.router.post(this.post + '/like/:path', auth, this.postService.likePost)
        this.router.delete(this.post + '/like/:path', auth, this.postService.unlikePost)
        this.router.get(this.post + '/like/:path', this.postService.getPostLikes)
        this.router.get(this.post + '/liked-by/recent/:username', this.postService.getRecentUserLikes)
        this.router.put(this.post + '/:path', auth, this.postService.updatePost)
    }
}
export default PostController
