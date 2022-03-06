import { EntityRepository, Repository } from 'typeorm'
import { ProfileCommentLike } from '../entities/profile_comment_like.entity'
import { Profile } from '../entities/profile.entity'
import { Comment } from '../entities/comment.entity'

@EntityRepository(ProfileCommentLike)
export class ProfileCommentLikeRepository extends Repository<ProfileCommentLike> {

  public async getCommentLikes(id: number): Promise<ProfileCommentLike[]> {
    const commentLikes = await this.find({ where: { comment: id }, relations: ['profile'] })

    return commentLikes
  }

  public async createCommentLike(comment: Comment, profile: Profile): Promise<void> {
    const commentLikes = await this.find({ where: { profile: profile.id, comment: comment.id } })

    if (commentLikes.length > 0) return

    await this.save(
      await this.create({
        profile: profile,
        comment: comment,
        liked_at: new Date(),
      })
    )
  }

  public async deleteCommentLike(profile: Profile, comment: Comment): Promise<void> {
    const commentLikes = await this.find({ where: { profile: profile.id, comment: comment.id } })

    if (commentLikes.length < 1) return

    await this.remove(commentLikes)
  }
}
