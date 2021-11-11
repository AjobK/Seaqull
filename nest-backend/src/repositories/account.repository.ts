import { EntityRepository, Repository } from 'typeorm'
import { Account } from '../entities/account'

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {

  async getAccountByUsername(user_name: string): Promise<Account> {
    const account = await this.findOne({ user_name })

    return account
  }

}
