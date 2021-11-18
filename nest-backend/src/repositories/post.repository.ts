import { EntityRepository, IsNull, Repository } from 'typeorm'
import { Post } from '../entities/post.entity'
import { Attachment } from '../entities/attachment.entity'

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {

  public async getPosts(skipSize: string, amount: number): Promise<Post[]> {
    const skipAmount = parseInt(skipSize) * amount
    const postList = this.find({ where: { archived_at: IsNull() }, take: amount, skip: skipAmount })

    return postList
  }

  public async getPostByPath(postPath: string): Promise<Post> {
    const post = await this.findOne({ path: postPath })

    return post
  }

  public async getPostByPathWithAttachment(postPath: string): Promise<Post> {
    const post = await this.findOne({ where: { path: postPath }, relations: ['thumbnail_attachment'] })

    return post
  }

  public async getPostAttachment(postId: number): Promise<Attachment> {
    const post = await this.findOne({ where: { id: postId }, relations: ['thumbnail_attachment'] })

    return post.thumbnail_attachment
  }

  public async getAmountPosts(): Promise<number> {
    const count = await this.count()

    return count
  }
}
