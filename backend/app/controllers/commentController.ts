import ControllerBase from '../interfaces/ControllerBase'
import * as express from 'express'
import CommentService from '../service/commentService'

class CommentController implements ControllerBase{
    public comment = '/comment'
    public router = express.Router()
    private commentService: CommentService

    constructor() {
        this.commentService = new CommentService()
        this.initRoutes()
    }

    public initRoutes(): void {
        this.router.get(this.comment + '/:path', this.commentService.getComments)
        this.router.post(this.comment, this.commentService.createComment)
    }
}

export default CommentController