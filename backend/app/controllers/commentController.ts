import { Request, Response } from 'express'
import Comment from '../entities/comment'
import ProfileDAO from '../daos/profileDAO'
import CommentDAO from '../daos/commentDAO'
import PostDAO from '../daos/postDAO'

class CommentController {
    private dao: CommentDAO
    private profileDAO: ProfileDAO
    private postDAO: PostDAO

    constructor() {
        this.dao = new CommentDAO()
        this.profileDAO = new ProfileDAO()
        this.postDAO = new PostDAO()
    }

    public getComments = async (req: Request, res: Response): Promise<Response> => {
        const { path } = req.params
        const foundComments = await this.dao.getComments(
            await this.postDAO.getPostByPath(path)
        )

        if (path && foundComments)
            return res.status(200).json(foundComments)
        else
            return res.status(404).json({ 'message': 'No comments found on that path' })
    }

    public createComment = async (req: Request | any, res: Response): Promise<Response> => {
        const newComment = new Comment()
        const { path, content, parent_comment_id } = req.body

        const post = await this.postDAO.getPostByPath(path)
        const profile = await this.profileDAO.getProfileByUsername(req.decoded.username)

        if (!post || !profile)
            return res.status(422).json({ message: 'Invalid data' })

        newComment.profile = profile
        newComment.post = post
        newComment.content = content
        newComment.parent_comment_id = parent_comment_id
        newComment.created_at = new Date()
        newComment.updated_at = new Date()

        await this.dao.createComment(newComment)

        return res.status(200).json({ message: 'Comment added!' })
    }

    public deleteComment = async (req: Request | any, res: Response): Promise<Response> => {
        const comment = await this.dao.getComment(req.params.id)

        if(comment.profile.display_name === req.decoded.username) {
            await this.dao.archiveComment(req.params.id)
            return res.status(200).json({ message: 'Comment removed' })
        }
        return res.status(403).json({ message: 'Unauthorized' })

    }
}

export default CommentController
