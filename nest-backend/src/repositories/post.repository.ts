import { EntityRepository, IsNull, Repository } from 'typeorm'
import { Post } from '../entities/post.entity'
import { Attachment } from '../entities/attachment.entity'
import { Profile } from '../entities/profile.entity'

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {

  public async getPosts(skipSize: string, amount: number): Promise<Post[]> {
    const skipAmount = parseInt(skipSize) * amount
    const postList = this.find({ where: { archived_at: IsNull() }, take: amount, skip: skipAmount })

    return postList
  }

  public async getPostByPath(postPath: string): Promise<Post> {
    const post = await this.findOne({ path: postPath }, { relations: ['profile'] })

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

  public async getPostsByProfile(profile: Profile): Promise<Post[]> {
    const posts = await this.createQueryBuilder('post')
      .leftJoinAndSelect('post.profile', 'profile')
      .where('post.profile = :profileId', { profileId: profile.id })
      .andWhere('post.archived_at IS NULL')
      .orderBy({
        'post.updated_at': 'DESC'
      })
      .getMany()

    return posts
  }

  public async createPost(newPost: Post): Promise<void> {
    await this.save(newPost)
  }

  public async updatePost(post: Post): Promise<Post> {
    const newPost = await this.save(post)

    return newPost
  }
}
