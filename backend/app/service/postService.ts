import {Request, Response} from 'express'
import PostDAO from '../dao/postDao'
import UserDao from '../dao/userDao'
import Post from '../entity/post'
import PostLike from '../entity/post_like'
import {v4 as uuidv4} from 'uuid'
import User from "../entity/user";

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
        // Retrieve user
        const user = await this.fetchUser(req)
        // Retrieve post
        const foundPost = await this.postDao.getPostByPath(req.params.path)

        const postLike = new PostLike()
        postLike.user = user
        postLike.post = foundPost
        postLike.liked_at = new Date()

        const newLike = await this.postDao.likePost(postLike)

        if (newLike)
            return res.status(200).json({ 'message': 'Post liked!' })
        else
            return res.status(400).json({ 'error': 'Post could not be liked.' })
    }


    public unlikePost = async (req: Request, res: Response): Promise<Response> => {
        // Retrieve user
        const user = await this.fetchUser(req)
        // Retrieve post
        const foundPost = await this.postDao.getPostByPath(req.params.path)

        const foundLike = await this.postDao.findLikeByPostAndUser(foundPost, user)
        const removedLike = await this.postDao.unlikePost(foundLike)

        if (removedLike && removedLike.affected > 0) {
            return res.status(200).json({ 'message': 'Like removed!' })
        } else {
            return res.status(404).json({ 'message': 'Like to remove could not be found' })
        }
    }

    public getPostLikes = async (req: Request, res: Response): Promise<any> => {
        const foundPost = await this.postDao.getPostByPath(req.params.path)
        const foundLikes = await this.postDao.getPostLikesById(foundPost.id)

        if (req.params.path && foundLikes)
            return res.status(200).json(foundLikes)
        else
            return res.status(404).json({ 'message': 'No likes found for that post id' })
    }

    public getPostLikesAmount = async (req: Request, res: Response): Promise<any> => {
        const foundPost = await this.postDao.getPostByPath(req.params.path)
        let postLikesAmount
        try {
            const foundLikes = await this.postDao.getPostLikesById(foundPost.id)
            postLikesAmount = foundLikes.length
        } catch(err) {
            postLikesAmount = 0
        }

        const user = await this.fetchUser(req)
        console.log(await this.postDao.findLikeByPostAndUser(foundPost, user || null))
        let userLiked = !!(await this.postDao.findLikeByPostAndUser(foundPost, user || null))

        return res.status(200).json({'likes_amount': postLikesAmount, 'user_liked': userLiked})
    }

    // TODO Move to another file?
    private fetchUser = async (req: Request): Promise<User> => {
        try {
            const {token} = req.cookies
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            return await this.userDao.getUserByUsername(decodedToken.username)
        } catch(err) {
            return null
        }
    }
}
export default PostService
