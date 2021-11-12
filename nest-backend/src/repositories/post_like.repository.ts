import { EntityRepository, Repository } from 'typeorm'
import { PostLike } from '../entities/post_like.entity'

@EntityRepository(PostLike)
export class PostLikeRepository extends Repository<PostLike> {

}
