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
    const foundComments = await this.dao.getComments(await this.postDAO.getPostByPath(path))

    if (path && foundComments) return res.status(200).json(foundComments)
    else return res.status(404).json({ message: 'No comments found on that path' })
  }

  public pinComment = async (req: Request | any, res: Response): Promise<Response> => {
    const { id } = req.params

    const post = await this.postDAO.getPostByPath(await this.dao.getPostPathByCommentId(id))
    const profile = await this.profileDAO.getProfileByUsername(req.decoded.username)

    if (!post) {
      return res.status(404).json({ message: 'Comment or post not found' })
    }

    if (profile.id === post.profile.id) {
      await this.dao.pinComment(id)

      return res.status(200).json({ message: 'Succesfully pinned comment' })
    }

    return res.status(401).json({ message: 'Invalid user' })
  }

  public unpinComment = async (req: Request | any, res: Response): Promise<Response> => {
    const { id } = req.params

    const post = await this.postDAO.getPostByPath(await this.dao.getPostPathByCommentId(id))
    const profile = await this.profileDAO.getProfileByUsername(req.decoded.username)

    if (!post) {
      return res.status(404).json({ message: 'Comment or post not found' })
    }

    if (profile.id === post.profile.id) {
      await this.dao.unpinComment(id)

      return res.status(200).json({ message: 'Succesfully unpinned comment' })
    }

    return res.status(401).json({ message: 'Invalid user' })
  }

  public getCommentLikes = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const foundCommentLikes = await this.dao.getCommentLikes(Number(id))

    return res.status(200).json(foundCommentLikes)
  }

  public getHasProfileLikedComment = async (req: Request | any, res: Response): Promise<Response> => {
    const { id } = req.params

    const profile = await this.profileDAO.getProfileByUsername(req.decoded.username)
    const foundCommentLikes = await this.dao.getCommentLikes(Number(id))

    foundCommentLikes.forEach((commentLike: any) => {
      if (commentLike.profile.id === profile.id) return res.status(200).json(true)
    })

    return res.status(200).json(false)
  }

  public createCommentLike = async (req: Request | any, res: Response): Promise<Response> => {
    const { id } = req.params

    const profile = await this.profileDAO.getProfileByUsername(req.decoded.username)
    const comment = await this.dao.getComment(id)

    if (!comment) return res.status(404).json({ message: 'Comment was not found and therefore not liked' })

    this.dao.createCommentLike(comment, profile)
      .then(() => {
        return res.status(200).json({ message: 'Succesfully added commentLike' })
      })
      .catch(() => {
        return res.status(500).json({ message: 'A serverside error occured' })
      })

  }

  public deleteCommentLike = async (req: Request | any, res: Response): Promise<Response> => {
    const { id } = req.params

    const profile = await this.profileDAO.getProfileByUsername(req.decoded.username)
    const comment = await this.dao.getComment(id)

    if (!comment || !profile) return res.status(404).json({ message: 'Invalid profile or comment id given' })

    const result = await this.dao.deleteCommentLike(comment, profile)

    if (result.affected < 1) {
      return res.status(404).json(
        { message: 'No comment found with given comment id and profile, therefore none were deleted' }
      )
    }

    return res.status(200).json({ message: 'Succesfully added commentLike' })
  }

  public createComment = async (req: Request | any, res: Response): Promise<Response> => {
    const newComment = new Comment()
    const { path, content, parent_comment_id } = req.body

    const post = await this.postDAO.getPostByPath(path)
    const profile = await this.profileDAO.getProfileByUsername(req.decoded.username)

    if (!post || !profile)
      return res
        .status(422)
        .json({ message: 'Invalid post or profile given. Likely an attempt to comment on "new-post" page.' })

    newComment.profile = profile
    newComment.post = post
    newComment.content = content
    newComment.parent_comment_id = parent_comment_id
    newComment.created_at = new Date()
    newComment.updated_at = new Date()
    newComment.is_pinned = false

    await this.dao.createComment(newComment)

    return res.status(200).json({ message: 'Comment added!' })
  }

  public deleteComment = async (req: Request | any, res: Response): Promise<Response> => {
    const comment = await this.dao.getComment(req.params.id)

    if (comment.profile.display_name === req.decoded.username) {
      await this.dao.archiveComment(req.params.id)

      return res.status(200).json({ message: 'Comment removed' })
    }

    return res.status(403).json({ message: 'Unauthorized' })
  }
}

export default CommentController
