import { EntityRepository, Repository } from 'typeorm'
import { Account } from '../entities/account.entity'

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {

  public async getAccountByUsername(username: string): Promise<Account> {
    const account = await this.findOne({ user_name: username })

    return account
  }

  public async getAccountProfileAndRoleByUsername(username: string): Promise<Account> {
    const account = await this.createQueryBuilder('account')
      .leftJoinAndSelect('account.role', 'role')
      .leftJoinAndSelect('account.profile', 'profile')
      .select(['account.role'])
      .where('account.user_name = :user_name', { user_name: username })
      .getRawOne()

    return account
  }
}
