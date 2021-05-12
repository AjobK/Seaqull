import { Request, Response } from 'express'
import comment from '../entity/comment'
import ProfileDAO from '../dao/profileDAO'
import CommentDAO from '../dao/commentDAO'

class CommentController {
    private dao: CommentDAO
    private profileDAO: ProfileDAO

    constructor() {
        this.dao = new CommentDAO()
        this.profileDAO = new ProfileDAO()
    }

    public getComments = async (req: Request, res: Response): Promise<Response> => {
        const foundComments = await this.dao.getComments(req.params.path)

        if (req.params.path && foundComments)
            return res.status(200).json(foundComments)
        else
            return res.status(404).json({ 'message': 'No comments found on that path' })
    }

    public createComment = async (req: Request | any, res: Response): Promise<Response> => {
        const newComment = new comment()
        const { path, content, parent_comment_id } = req.body
        const profile = await this.profileDAO.getProfileByUsername(req.decoded.username)

        newComment.profile = profile
        newComment.path = path
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
