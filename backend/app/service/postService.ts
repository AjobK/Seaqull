import { Request, Response } from 'express'
import PostDAO from '../dao/postDao'
import UserDao from '../dao/userDao'
import Post from '../entity/post'
import PostLike from '../entity/post_like'
import { v4 as uuidv4 } from 'uuid'
const jwt = require('jsonwebtoken')

class PostService {
    private postDao: PostDAO
    private userDao: UserDao

    constructor() {
        this.postDao = new PostDAO()
        this.userDao = new UserDao()
    }

    public getPosts = async (req: Request, res: Response): Promise<Response> => {
        const posts = await this.postDao.getPosts()

        return res.status(200).json(posts)
    }

    public getPostByPath = async (req: Request, res: Response): Promise<any> => {
        const foundPost = await this.postDao.getPostByPath(req.params.path)

        if (req.params.path && foundPost)
            return res.status(200).json(foundPost)
        else
            return res.status(404).json({ 'message': 'No post found on that path' })
    }

    public createPost = async (req: Request, res: Response): Promise<Response> => {
        const newPost = new Post()
        const { title, description, content } = req.body

        newPost.title = title
        newPost.description = description
        newPost.content = content
        newPost.path = uuidv4()
        newPost.published_at = new Date()
        newPost.created_at = new Date()

        await this.postDao.createPost(newPost)

        return res.status(200).json({ message: 'Post added!' })
    }

    public likePost = async (req: Request, res: Response): Promise<Response> => {
        // extracting token
        // const { token } = req.cookies
        // const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        const post = await this.postDao.getPostByPath(req.params.path)

        // TODO retrieve username
        const user = await this.userDao.getUserByUsername('Curtis')

        const postLike = new PostLike()

        postLike.user = user
        postLike.post = post
        postLike.liked_at = new Date()

        const newLike = await this.postDao.likePost(postLike)

        return res.status(200).json({ message: newLike })
    }

    public getPostLikes = async (req: Request, res: Response): Promise<any> => {
        const foundPosts = await this.postDao.getPostLikesById(+req.params.postId)

        if (req.params.postId && foundPosts)
            return res.status(200).json(foundPosts)
        else
            return res.status(404).json({ 'message': 'No likes found for that post id' })
    }

    public getPostLikesAmount = async (req: Request, res: Response): Promise<any> => {
        const foundPosts = await this.postDao.getPostLikesById(+req.params.postId)
        const postLikesAmount = foundPosts.length

        if (req.params.postId && foundPosts)
            return res.status(200).json({'likes_amount': postLikesAmount})
        else
            return res.status(404).json({ 'message': 'No likes found for that post id' })
    }
}
export default PostService
