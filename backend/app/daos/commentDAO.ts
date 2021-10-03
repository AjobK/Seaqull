import DatabaseConnector from '../utils/databaseConnector'
import { Comment } from '../entities/comment'
import Post from '../entities/post'
import Profile from '../entities/profile'
import ProfileCommentLike from '../entities/profile_comment_like'

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

    public async getCommentLikes(id: number): Promise<ProfileCommentLike[]> {
      const repository = await DatabaseConnector.getRepository('ProfileCommentLike')

      const profileCommentLikes = await repository.createQueryBuilder('commentLike')
        .leftJoinAndSelect('commentLike.profile', 'profile')
        .where('commentLike.comment_id = :id', { id })
        .getMany()

      return profileCommentLikes
    }

    public async createCommentLike(comment: Comment, profile: Profile): Promise<void> {
      const repository = await DatabaseConnector.getRepository('ProfileCommentLike')

      if ((await repository.find({ profile: profile.id })).length > 0) {
        return
      }

      const commentLike = {
        profile: profile,
        comment: comment,
        liked_at: new Date(),
      }

      repository.save(commentLike)
    }

    async deleteCommentLike(comment: Comment, profile: Profile): Promise<any> {
      const repository = await DatabaseConnector.getRepository('ProfileCommentLike')

      const result = await repository.delete({ profile: profile.id, comment: comment.id })

      return result
    }
}

export default CommentDAO
