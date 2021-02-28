import { Request, Response } from 'express'
import CommentDAO from '../dao/commentDAO'
import comment from '../entity/comment'
import UserDAO from '../dao/userDao'

class CommentService {
    private dao: CommentDAO
    private userDAO: UserDAO

    constructor() {
        this.dao = new CommentDAO()
        this.userDAO = new UserDAO()
    }

    public getComments = async (req: Request, res: Response): Promise<Response> => {
        const foundComments = await this.dao.getComments(req.params.path)

        if (req.params.path && foundComments)
            return res.status(200).json(foundComments);
        else
            return res.status(404).json({ 'message': 'No comments found on that path' });
    }

    public createComment = async (req: Request | any, res: Response): Promise<Response> => {
        const newComment = new comment()
        const { path, content } = req.body
        const user = await this.userDAO.getUserByUsername(req.decoded.username)

        newComment.user = user.account_id
        newComment.path = path
        newComment.content = content
        newComment.created_at = new Date()
        newComment.updated_at = new Date()

        await this.dao.createComment(newComment)

        return res.status(200).json({ message: 'Comment added!' })
    }
}

export default CommentService