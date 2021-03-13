import { Request, Response } from 'express'
import PostDAO from '../dao/postDao'
import Post from '../entity/post'
import { v4 as uuidv4 } from 'uuid'

class PostService {
    private dao: PostDAO

    constructor() {
        this.dao = new PostDAO()
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
}
export default PostService