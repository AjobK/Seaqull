import { EntityRepository, Repository } from 'typeorm'
import { Comment } from '../entities/comment.entity'
import { Post } from '../entities/post.entity'
import { Profile } from '../entities/profile.entity'

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {

  public async getCommentsByPost(post: Post): Promise<Comment[]> {
    const comments = await this.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.post', 'post')
      .leftJoinAndSelect('comment.profile', 'profile')
      .leftJoinAndSelect('profile.avatar_attachment', 'attachment')
      .where('comment.archived_at IS NULL')
      .andWhere('post.id = :post_id', { post_id: post.id })
      .orderBy('comment.id', 'DESC')
      .getMany()

    return comments
  }

  public async getCommentChildren(parent_comment_id: number): Promise<Comment[]> {
    return await this.find({ where: { parent_comment_id } })
  }

  public async getCommentById(id: number): Promise<Comment> {
    return await this.findOne(id)
  }

  public async getPostByCommentId(id: number): Promise<Post> {
    const comment = await this.findOne(id, { relations: ['post'] })

    return comment.post
  }

  public async createComment(comment: Comment): Promise<void> {
    await this.save(comment)
  }

  public async pinCommentById(id: number): Promise<void> {
    const comment = await this.findOne(id)

    comment.is_pinned = true

    await this.save(comment)
  }

  public async unpinCommentById(id: number): Promise<void> {
    const comment = await this.findOne(id)

    comment.is_pinned = false

    await this.save(comment)
  }

  public async archiveComment(comment: Comment, archivedDate: Date): Promise<void> {
    comment.archived_at = archivedDate
    await this.save(comment)
  }

  public async getCommentProfileById(id: number): Promise<Profile> {
    const comment = await this.findOne(id, { relations: ['profile'] })

    if (!comment) return undefined

    return comment.profile
  }
}
