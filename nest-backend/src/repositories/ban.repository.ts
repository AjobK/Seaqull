import { EntityRepository, Repository } from 'typeorm'
import { Ban } from '../entities/ban.entity'

@EntityRepository(Ban)
export class BanRepository extends Repository<Ban> {

}
