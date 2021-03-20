import { Request, Response } from 'express'
import PostDAO from '../dao/postDao'
import Post from '../entity/post'
import { v4 as uuidv4 } from 'uuid'
import ProfileDAO from '../dao/profileDao'
import AccountDAO from '../dao/accountDao'
const jwt = require('jsonwebtoken')
require('dotenv').config()

class PostService {
    private dao: PostDAO
    private profileDAO: ProfileDAO

    constructor() {
        this.dao = new PostDAO()
        this.profileDAO = new ProfileDAO()
    }

    public getPosts = async (req: Request, res: Response): Promise<Response> => {
        let posts
        const amount = 7

        if (req.query.page == null) {
            posts = await this.dao.getPosts('0', amount)
        } else {
            posts = await this.dao.getPosts(String(req.query.page), amount)
            if (posts.length == 0 ){
                posts = await this.dao.getPosts('0', amount)
                return res.status(200).json({ 'message': 'You`ve reached the last post' })
            }
        }
        const count = await this.dao.getAmountPosts()
        const message = { posts, totalPosts: count, per_page: amount }
        return res.status(200).json(message)
    }

    public getOwnedPosts = async (req: Request, res: Response): Promise<Response> => {
        let account = null

        try {
            account = await new AccountDAO().getAccountByUsername(req.params.username)
        } catch (e) { return res.status(404).json([]) }

        const posts = await this.dao.getOwnedPosts(account.profile)

        return res.status(200).json(posts)
    }

    public getPostByPath = async (req: Request, res: Response): Promise<any> => {
        const foundPost = await this.dao.getPostByPath(req.params.path)
        const { JWT_SECRET } = process.env
        let decodedId = -1

        try {
            const decodedToken = jwt.verify(req.cookies.token, JWT_SECRET)
            const account = await new AccountDAO().getAccountByUsername(decodedToken.username)
            decodedId = account.profile.id
        } catch (e) { }


        if (req.params.path && foundPost)
            return res.status(200).json({ isOwner: foundPost.profile.id == decodedId, ...foundPost })
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

        const decodedToken = jwt.verify(req.cookies.token, JWT_SECRET)

        if (decodedToken.username != null) {
            const profile = await this.profileDAO.getProfileByUsername(decodedToken.username)
            newPost.profile = profile
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

        const decodedToken = jwt.verify(req.cookies.token, JWT_SECRET)
        if (post.profile.display_name != decodedToken.username) return res.status(405).json({ 'error': 'Not allowed' })

        if (!post) return res.status(404).json({ 'message': 'post not found' })

        const updatedPost = await this.dao.updatePost(post)

        if (!updatedPost) return res.status(404).json({ 'message': 'post not updated' })

        return res.status(200).json({ 'message': 'post was updated' })
    }
}
export default PostService