import { Request, Response } from 'express'
import PostDAO from '../dao/postDao'
import post from '../entity/post'
import { v4 as uuidv4 } from 'uuid'

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
        const newPost = new post()
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
}
export default PostService