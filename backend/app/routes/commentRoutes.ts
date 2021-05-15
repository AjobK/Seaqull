import ControllerBase from '../interfaces/ControllerBase'
import * as express from 'express'
import CommentController from '../controllers/commentController'
const isAuth = require('../middleware/isAuth')

class CommentRoutes implements ControllerBase{
    public comment = '/comment'
    public router = express.Router()
    private commentController: CommentController

    constructor() {
        this.commentController = new CommentController()
        this.initRoutes()
    }

    public initRoutes(): void {
        this.router.get(this.comment + '/:path', this.commentController.getComments)
        this.router.post(this.comment, isAuth, this.commentController.createComment)
        this.router.delete(this.comment + '/:id', isAuth, this.commentController.deleteComment)
    }
}

export default CommentRoutes