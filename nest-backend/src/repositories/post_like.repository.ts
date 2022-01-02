import { EntityRepository, Repository } from 'typeorm'
import { PostLike } from '../entities/post_like.entity'
import { Profile } from '../entities/profile.entity'
import { Post } from '../entities/post.entity'

@EntityRepository(PostLike)
export class PostLikeRepository extends Repository<PostLike> {

  public async getPostLikesById(id: number): Promise<PostLike[]> {
    const postLikes = await this.find({ where: { post: id } })

    return postLikes
  }

  public async findIfLikeByPostAndProfile(post: Post, profile: Profile): Promise<boolean> {
    const postLike = await this.findOne({ where: { post: post.id, profile: profile.id } })

    return !!postLike
  }

  public async getUserLikesByProfileId(id: number, limit: number): Promise<PostLike[]> {
    const userLikes = await this.find({ where: { profile: id }, take: limit, relations: ['post'] })

    return userLikes
  }

  public async likePost(postLike: PostLike): Promise<void> {
    await this.save(postLike)
  }

  public async findLikeByPostAndProfile(post: Post, profile: Profile): Promise<PostLike> {
    return await this.findOne({ where: { post: post.id, profile: profile.id } })
  }

  public async unlikePost(postLike: PostLike): Promise<void> {
    await this.delete(postLike)
  }
}
