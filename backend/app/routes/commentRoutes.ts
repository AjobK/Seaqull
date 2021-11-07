import RouterBase from '../interfaces/RouterBase'
import * as express from 'express'
import CommentController from '../controllers/commentController'

const isAuth = require('../middlewares/isAuth')

class CommentRoutes implements RouterBase {
    public comment = '/comment'
    public router = express.Router()
    private commentController: CommentController

    constructor() {
      this.commentController = new CommentController()
      this.initRoutes()
    }

    public initRoutes(): void {
      this.router.get(this.comment + '/:path', isAuth, this.commentController.getComments)
      this.router.get(this.comment + '/:path/no-login', this.commentController.getCommentsWithoutCredentials)
      this.router.post(this.comment, isAuth, this.commentController.createComment)
      this.router.post(this.comment + '/likes/:id', isAuth, this.commentController.createCommentLike)
      this.router.patch(this.comment + '/:id/pin', isAuth, this.commentController.pinComment)
      this.router.patch(this.comment + '/:id/unpin', isAuth, this.commentController.unpinComment)
      this.router.delete(this.comment + '/likes/:id', isAuth, this.commentController.deleteCommentLike)
      this.router.delete(this.comment + '/:id', isAuth, this.commentController.deleteComment)
    }
}

export default CommentRoutes
