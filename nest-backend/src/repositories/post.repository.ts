import { EntityRepository, Repository } from 'typeorm'
import { Post } from '../entities/post.entity'

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {

  public async getPostByPath(postPath: string): Promise<Post> {
    const post = this.findOne({ path: postPath })

    return post
  }
}
