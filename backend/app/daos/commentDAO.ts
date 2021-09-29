import DatabaseConnector from '../utils/databaseConnector'
import { Comment } from '../entities/comment'
import Post from '../entities/post'

class CommentDAO {
    private repo = 'Comment'

    public async getComments(post: Post): Promise<Comment[]> {
      const repository = await DatabaseConnector.getRepository(this.repo)

      const commentList = await repository.createQueryBuilder('comment')
        .leftJoinAndSelect('comment.post', 'post')
        .leftJoinAndSelect('comment.profile', 'profile')
        .leftJoinAndSelect('profile.avatar_attachment', 'attachment')
        .where('comment.archived_at IS NULL')
        .andWhere('post.id = :post_id', { post_id: post.id })
        .orderBy('comment.id', 'DESC')
        .getMany()

      return commentList
    }

    public async getComment(id: number): Promise<Comment> {
      const repository = await DatabaseConnector.getRepository(this.repo)

      return await repository.findOne({ where: { id: id }, relations: ['profile'], order: { id: 'DESC', }, })
    }

    public async createComment(newComment: Comment): Promise<any> {
      const repository = await DatabaseConnector.getRepository(this.repo)

      return repository.save(newComment)
    }

    public async archiveComment(id: number): Promise<any> {
      const repository = await DatabaseConnector.getRepository(this.repo)
      const archiveDate = new Date()

      const comment: Comment = await repository.findOne({ where: { id: id } })
      const children: Comment[] = await repository.find({ where: { parent_comment_id : id } })

      comment.archived_at = archiveDate

      if (children) {
        children.forEach((child) => {
          child.archived_at = archiveDate
        })

        repository.save(children)
      }

      return repository.save(comment)
    }

    public async getCommentLikes(id: number) {
      const repository = await DatabaseConnector.getRepository('ProfileCommentLike')

      const profileCommentLikes = await repository.createQueryBuilder('commentLike')
        .leftJoinAndSelect('commentLike.profile', 'profile')
        .where('commentLike.id = :id', { id })
        .getMany()

      return profileCommentLikes
    }
}

export default CommentDAO
