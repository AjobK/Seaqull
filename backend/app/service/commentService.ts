import { Request, Response } from 'express'
import CommentDAO from '../dao/commentDAO'
import comment from '../entity/comment'

class CommentService {
    private dao: CommentDAO

    constructor() {
        this.dao = new CommentDAO()
    }

    public getComments = async (req: Request, res: Response): Promise<Response> => {
        const foundComments = await this.dao.getComments(req.params.path)

        if (req.params.path && foundComments)
            return res.status(200).json(foundComments);
        else
            return res.status(404).json({ "message": "No comments found on that path" });
    }

    public createComment = async (req: Request, res: Response): Promise<Response> => {
        const newComment = new comment()
        const { path, content } = req.body

        //TODO add user to comment
        newComment.path = path
        newComment.content = content
        newComment.created_at = new Date()
        newComment.updated_at = new Date()

        await this.dao.createComment(newComment)

        return res.status(200).json({ message: 'Comment added!' })
    }
}

export default CommentService