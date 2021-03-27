import { Request, Response } from 'express'
import PostDAO from '../dao/postDao'
import Post from '../entity/post'
import { v4 as uuidv4 } from 'uuid'
import ProfileDAO from '../dao/ProfileDao'
import AccountDAO from '../dao/accountDao'
const jwt = require('jsonwebtoken')
require('dotenv').config()
import PostLike from '../entity/post_like'
import Profile from '../entity/profile';

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
            if (posts.length == 0 ) {
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
        const response = {
            post: null,
            likes: {
                amount: 0,
                userLiked: false
            },
            isOwner: false
        }

        const foundPost = await this.dao.getPostByPath(req.params.path)
        const { JWT_SECRET } = process.env
        let decodedId = -1

        try {
            const decodedToken = jwt.verify(req.cookies.token, JWT_SECRET)
            const account = await new AccountDAO().getAccountByUsername(decodedToken.username)
            decodedId = account.profile.id
        } catch (e) { }


        // Fetch amount of likes on post
        const foundLikes = await this.dao.getPostLikesById(foundPost.id)
        let postLikesAmount = foundLikes ? foundLikes.length : 0

        // Fetch whether profile liked the post
        const profile = await this.fetchProfile(req)
        let userLiked = !!(await this.dao.findLikeByPostAndProfile(foundPost, profile || null))

        response.post = foundPost
        response.likes = {
            amount: postLikesAmount,
            userLiked: userLiked
        }
        response.isOwner = foundPost.profile.id == decodedId

        if (req.params.path && foundPost)
            return res.status(200).json(response)
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

    public likePost = async (req: Request, res: Response): Promise<Response> => {
        // Retrieve profile
        const profile = await this.fetchProfile(req)
        // Retrieve post
        const foundPost = await this.dao.getPostByPath(req.params.path)

        // Check whether post has been liked before
        const foundLike = await this.dao.findLikeByPostAndProfile(foundPost, profile)
        if (foundLike)
            return res.status(400).json({ 'error': 'Post has already been liked.' })

        const postLike = new PostLike()
        postLike.profile = profile
        postLike.post = foundPost
        postLike.liked_at = new Date()

        const newLike = await this.dao.likePost(postLike)

        if (newLike)
            return res.status(200).json({ 'message': 'Post liked!' })
        else
            return res.status(400).json({ 'error': 'Post could not be liked.' })
    }


    public unlikePost = async (req: Request, res: Response): Promise<Response> => {
        // Retrieve profile
        const profile = await this.fetchProfile(req)
        // Retrieve post
        const foundPost = await this.dao.getPostByPath(req.params.path)

        const foundLike = await this.dao.findLikeByPostAndProfile(foundPost, profile)
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

    public getRecentUserLikes = async (req: Request, res: Response): Promise<any> => {
        const foundUser = await this.profileDAO.getProfileByUsername(req.params.username)
        const foundLikes = await this.dao.getRecentUserLikesByProfileId(foundUser.id, 8)

        if (req.params.username && foundLikes) {
            const likes = []
            foundLikes.forEach((like) => {
                likes.push(like.post)
            })

            return res.status(200).json(likes)
        }
        else
            return res.status(404).json({ 'message': 'No likes found for that username' })
    }

    // TODO Move to another file?
    private fetchProfile = async (req: Request): Promise<Profile> => {
        const {token} = req.cookies
        if (token) {
            try {
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
                return await this.profileDAO.getProfileByUsername(decodedToken.username)
            } catch(err) {
                return null
            }
        }
        return null
    }
}

export default PostService
