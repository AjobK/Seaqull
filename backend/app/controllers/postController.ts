import { Request, Response } from 'express'
import PostDAO from '../daos/postDAO'
import Post from '../entities/post'
import { v4 as uuidv4 } from 'uuid'
import AccountDAO from '../daos/accountDAO'
import PostLike from '../entities/post_like'
import Profile from '../entities/profile'
import ProfileDAO from '../daos/profileDAO'
import PostView from '../entities/post_view'
import NetworkService from '../utils/networkService'

const jwt = require('jsonwebtoken')

class PostController {
    private dao: PostDAO
    private profileDAO: ProfileDAO

    constructor() {
        this.dao = new PostDAO()
        this.profileDAO = new ProfileDAO()
    }

    public getPosts = async (req: Request, res: Response): Promise<Response> => {
        let posts
        const amount = 6

        if (req.query.page == null) {
            posts = await this.dao.getPosts('0', amount)
        } else {
            posts = await this.dao.getPosts(String(req.query.page), amount)

            if (posts.length <= 0 ) {
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
        let decodedId

        try {
            const decodedToken = jwt.verify(req.cookies.token, JWT_SECRET)
            const account = await new AccountDAO().getAccountByUsername(decodedToken.username)
            decodedId = account.profile.id
        } catch (e) {
            decodedId = -1
        }

        const foundLikes = await this.dao.getPostLikesById(foundPost.id)

        const postLikesAmount = foundLikes ? foundLikes.length : 0

        const profile = await this.fetchProfile(req)
        const userLiked = !!(await this.dao.findLikeByPostAndProfile(foundPost, profile || null))

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
        const { title, description, content } = req.body

        post.title = title
        post.description = description
        post.content = content

        const decodedToken = jwt.verify(req.cookies.token, JWT_SECRET)

        if (post.profile.display_name != decodedToken.username)
            return res.status(405).json({ 'error': 'Not allowed' })

        if (!post)
            return res.status(404).json({ 'message': 'Post not found' })

        const updatedPost = await this.dao.updatePost(post)

        if (!updatedPost)
            return res.status(404).json({ 'message': 'Could not update post' })

        return res.status(200).json({ 'message': 'Post has been updated!' })
    }

    public likePost = async (req: Request, res: Response): Promise<Response> => {
        const profile = await this.fetchProfile(req)
        const foundPost = await this.dao.getPostByPath(req.params.path)

        if (profile.id === foundPost.profile.id)
            return res.status(400).json({ 'error': 'Post owners cannot like their posts.' })

        const postLike = new PostLike()
        postLike.profile = profile
        postLike.post = foundPost
        postLike.liked_at = new Date()

        try {
            await this.dao.likePost(postLike)

            return res.status(200).json({ 'message': 'Post liked!' })
        } catch (e) {
            return res.status(400).json({ 'error': 'Post could not be liked.' })
        }
    }


    public unlikePost = async (req: Request, res: Response): Promise<Response> => {
        const profile = await this.fetchProfile(req)
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
            return res.status(200).json(foundLikes.reverse())
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
        } else {
            return res.status(404).json({ 'message': 'No likes found for that username' })
        }
    }

    public addViewToPost = async (req: Request, res: Response): Promise<any> => {
        const foundPost = await this.dao.getPostByPath(req.body.path)

        if(!foundPost) {
            return res.status(404).json({ 'message': 'Post not found' })
        }

        const ip = NetworkService.getUserIp(req)

        const postView = new PostView()
        postView.post = foundPost
        postView.ip = ip

        await this.dao.addViewToPost(postView)

        return res.status(200).json({ 'message': 'Post viewed' })
    }

    public getPostViewCount = async (req: Request, res: Response): Promise<any> => {
        const foundPost = await this.dao.getPostByPath(req.params.path)

        if(!foundPost) {
            return res.status(404).json({ 'message': 'Post not found' })
        }

        const viewCount = await this.dao.getPostViewCount(foundPost)

        return res.status(200).json({ 'views': viewCount })
    }

    // TODO Move to another file?
    private fetchProfile = async (req: Request): Promise<Profile> => {
        const { token } = req.cookies

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

export default PostController
