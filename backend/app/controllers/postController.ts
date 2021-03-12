import ControllerBase from '../interfaces/ControllerBase'
import * as express from 'express'
import PostService from '../service/postService'

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
        this.router.post(this.post, this.postService.createPost)
        this.router.post(this.post + '/like/:path', this.postService.likePost)
        this.router.get(this.post + '/like/:path', this.postService.getPostLikes)
        this.router.get(this.post + '/like/amount/:path', this.postService.getPostLikesAmount)
    }
}
export default PostController
