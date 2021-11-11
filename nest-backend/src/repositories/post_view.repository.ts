import { EntityRepository, Repository } from 'typeorm'
import { PostView } from '../entities/post_view'

@EntityRepository(PostView)
export class PostViewRepository extends Repository<PostView> {

}
