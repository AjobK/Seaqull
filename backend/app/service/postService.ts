import {Request, Response} from 'express'
import PostDAO from '../dao/postDao'
import UserDao from '../dao/userDao'
import Post from '../entity/post'
import PostLike from '../entity/post_like'
import {v4 as uuidv4} from 'uuid'
import User from "../entity/user";

const jwt = require('jsonwebtoken')

class PostService {
    private dao: PostDAO
    private userDao: UserDao

    constructor() {
        this.dao = new PostDAO()
        this.userDao = new UserDao()
    }

    public getPosts = async (req: Request, res: Response): Promise<Response> => {
        let posts
        const amount = 7;

        if(req.query.page == null) {
            posts = await this.dao.getPosts('0', amount)
        } else {
            posts = await this.dao.getPosts(String(req.query.page), amount)
            if(posts.length == 0 ){
                posts = await this.dao.getPosts('0', amount)
                return res.status(200).json({ 'message': 'You`ve reached the last post' })
            }
        }
        const count = await this.dao.getAmountPosts();
        const message = { posts, totalPosts: count, per_page: amount }
        return res.status(200).json(message)
    }

    public getPostByPath = async (req: Request, res: Response): Promise<any> => {
        const response = {
            post: null,
            likes: {
                amount: 0,
                user_liked: false
            }
        }

        const foundPost = await this.dao.getPostByPath(req.params.path)

        if (!foundPost)
            return res.status(404).json({ 'message': 'No post found on that path' })

        // Fetch amount of likes on post
        const foundLikes = await this.dao.getPostLikesById(foundPost.id)
        let postLikesAmount = foundLikes ? foundLikes.length : 0

        // Fetch whether user liked the post
        const user = await this.fetchUser(req)
        let userLiked = !!(await this.dao.findLikeByPostAndUser(foundPost, user || null))

        response.post = foundPost
        response.likes = {
            amount: postLikesAmount,
            user_liked: userLiked
        }

        return res.status(200).json(response)
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

        await this.dao.createPost(newPost)

        return res.status(200).json({ message: 'Post added!' })
    }

    public likePost = async (req: Request, res: Response): Promise<Response> => {
        // Retrieve user
        const user = await this.fetchUser(req)
        // Retrieve post
        const foundPost = await this.dao.getPostByPath(req.params.path)

        const postLike = new PostLike()
        postLike.user = user
        postLike.post = foundPost
        postLike.liked_at = new Date()

        const newLike = await this.dao.likePost(postLike)

        if (newLike)
            return res.status(200).json({ 'message': 'Post liked!' })
        else
            return res.status(400).json({ 'error': 'Post could not be liked.' })
    }


    public unlikePost = async (req: Request, res: Response): Promise<Response> => {
        // Retrieve user
        const user = await this.fetchUser(req)
        // Retrieve post
        const foundPost = await this.dao.getPostByPath(req.params.path)

        const foundLike = await this.dao.findLikeByPostAndUser(foundPost, user)
        const removedLike = await this.dao.unlikePost(foundLike)

        if (removedLike && removedLike.affected > 0) {
            return res.status(200).json({ 'message': 'Like removed!' })
        } else {
            return res.status(404).json({ 'message': 'Like to remove could not be found' })
        }
    }

    public getPostLikes = async (req: Request, res: Response): Promise<any> => {
        const foundPost = await this.dao.getPostByPath(req.params.path)
        const foundLikes = await this.dao.getPostLikesById(foundPost.id)

        if (req.params.path && foundLikes)
            return res.status(200).json(foundLikes)
        else
            return res.status(404).json({ 'message': 'No likes found for that post id' })
    }

    // TODO Move to another file?
    private fetchUser = async (req: Request): Promise<User> => {
        const {token} = req.cookies
        if (token) {
            try {
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
                return await this.userDao.getUserByUsername(decodedToken.username)
            } catch(err) {
                return null
            }
        }
        return null
    }
}
export default PostService
