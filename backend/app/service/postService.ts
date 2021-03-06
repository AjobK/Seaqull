import { Request, Response } from 'express'
import PostDAO from '../dao/postDao'
import Post from '../entity/post'
import { v4 as uuidv4 } from 'uuid'
import UserDAO from '../dao/userDao'
const jwt = require('jsonwebtoken');
require('dotenv').config()

class PostService {
    private dao: PostDAO
    private userDAO: UserDAO;

    constructor() {
        this.dao = new PostDAO()
        this.userDAO = new UserDAO()
    }

    public getPosts = async (req: Request, res: Response): Promise<Response> => {
        const posts = await this.dao.getPosts()

        return res.status(200).json(posts)
    }

    public getPostByPath = async (req: Request, res: Response): Promise<any> => {
        const foundPost = await this.dao.getPostByPath(req.params.path)
        const { JWT_SECRET } = process.env
        let decodedId = -1;

        try {
            const decodedToken = jwt.verify(req.cookies.token, JWT_SECRET);
            const user = await new UserDAO().getUserByUsername(decodedToken.username);
            decodedId = user.id;
        } catch (e) {
            console.log(e)
        }


        if (req.params.path && foundPost)
            return res.status(200).json({ isOwner: foundPost.user.id == decodedId, ...foundPost })
        else
            return res.status(404).json({ 'message': 'No post found on that path' })
    }

    public createPost = async (req: Request, res: Response): Promise<Response> => {
        const { JWT_SECRET } = process.env
        const newPost = new Post()
        const { title, description, content } = req.body

        newPost.title = title
        newPost.description = description
        newPost.content = content
        newPost.path = uuidv4()
        newPost.published_at = new Date()
        newPost.created_at = new Date()

        const decodedToken = jwt.verify(req.cookies.token, JWT_SECRET);
        if(decodedToken.username != null){
            const user = await this.userDAO.getUserByUsername(decodedToken.username)
            console.log(user)
            newPost.user = user;
            await this.dao.createPost(newPost)
        } else {
            return res.status(200).json({ message: 'Invalid jwt' })
        }

        return res.status(200).json({ message: 'Post added!' })
    }

    public updatePost = async (req: Request, res: Response): Promise<any> => {
        const post = await this.dao.getPostByPath(req.params.path)
        const { JWT_SECRET } = process.env

        post.title = req.body.title
        post.description = req.body.description
        post.content = req.body.content
        console.log(post)

        const decodedToken = jwt.verify(req.cookies.token, JWT_SECRET);
        if(post.user.display_name != decodedToken.username) return res.status(405).json({ 'error': 'Not allowed' })

        if(!post) return res.status(404).json({ 'message': 'post not found' });
        const updatedPost = await this.dao.updatePost(post)

        if(!updatedPost) return res.status(404).json({ 'message': 'post not updated' });

        return res.status(200).json({ 'message': 'post was updated' })
    }
}
export default PostService