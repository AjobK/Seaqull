import { EntityRepository, Repository } from 'typeorm'
import { TitleOwnedBy } from '../entities/title_owned_by'

@EntityRepository(TitleOwnedBy)
export class TitleOwnedByRepository extends Repository<TitleOwnedBy> {

}
