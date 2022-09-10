import { EntityRepository, Repository } from 'typeorm'
import { PostView } from '../entities/post_view.entity'
import { Post } from '../entities/post.entity'

@EntityRepository(PostView)
export class PostViewRepository extends Repository<PostView> {

  public async getPostViewCount(post: Post): Promise<number> {
    const viewCount = await this.count({ where: { post: post } })

    return viewCount
  }

  public async addViewToPost(postView: PostView): Promise<void> {
    await this.save(postView)
  }

  public async hasViewedPost(post: Post, ipAddress: string): Promise<boolean> {
    const postView = await this.findOne({ where: { post, ip: ipAddress } })

    return !!postView
  }
}
