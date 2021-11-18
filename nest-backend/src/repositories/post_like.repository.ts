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
}
