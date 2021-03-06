import { Request, Response } from 'express'
import PostDAO from '../dao/postDao'
import Post from '../entity/post'
import { v4 as uuidv4 } from 'uuid'
const jwt = require('jsonwebtoken')

class PostService {
    private dao: PostDAO

    constructor() {
        this.dao = new PostDAO()
    }

    public getPosts = async (req: Request, res: Response): Promise<Response> => {
        const posts = await this.dao.getPosts()

        return res.status(200).json(posts)
    }

    public getPostByPath = async (req: Request, res: Response): Promise<any> => {
        const foundPost = await this.dao.getPostByPath(req.params.path)

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

        await this.dao.createPost(newPost)

        return res.status(200).json({ message: 'Post added!' })
    }

    public likePost = async (req: Request, res: Response): Promise<Response> => {
        // extracting token
        // const { token } = req.cookies
        // const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        console.log(req.params.path)

        // retrieve user id TODO
        const userId = 1;
        const postId = +req.params.path
        const timestamp = new Date()

        const like: {
            user_id: number,
            post_id: number,
            timestamp: Date
        } = {
            user_id: userId,
            post_id: postId,
            timestamp
        }

        // console.log(like);

        return res.status(200).json({ message: req.params.path })
    }
}
export default PostService
