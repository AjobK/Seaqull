import { EntityRepository, Repository } from 'typeorm'
import { ArchivedPost } from '../entities/archivedPost'

@EntityRepository(ArchivedPost)
export class ArchivedPostRepository extends Repository<ArchivedPost> {

}
