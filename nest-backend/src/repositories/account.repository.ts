import { EntityRepository, Repository } from 'typeorm'
import { Account } from '../entities/account.entity'
import { Role } from '../entities/role.entity'

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {

  public async getAccountByUsername(username: string): Promise<Account> {
    const account = await this.findOne({ user_name: username })

    return account
  }

  public async getAccountRoleIdByUsername(username: string): Promise<number> {
    const role = await this.createQueryBuilder('account')
      .leftJoinAndSelect('account.role', 'role')
      .select(['account.role'])
      .where('account.user_name = :user_name', { user_name: username })
      .getRawOne()

    return role.role_id
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

  public async lockAccount(account: Account): Promise<number> {
    account.login_attempts_counts = 0
    account.locked_to = Date.now() + 30000

    await this.updateAccount(account)

    return Math.floor((account.locked_to - Date.now()) / 1000)
  }

  public async updateAccount(account: Account): Promise<void> {
    await this.save(account)
  }
}
