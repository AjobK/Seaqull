import { EntityRepository, Repository } from 'typeorm'
import { Post } from '../entities/post.entity'

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {

}
