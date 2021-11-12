import { EntityRepository, Repository } from 'typeorm'
import { Ban } from '../entities/ban.entity'
import { Account } from '../entities/account.entity'

@EntityRepository(Ban)
export class BanRepository extends Repository<Ban> {

  public async getBanByUser(account: Account): Promise<Ban> {
    const ban = await this.findOne({ where: { user: account.id } })

    return ban
  }
}
