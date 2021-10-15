import { EntityRepository, Repository } from 'typeorm'
import Account from '../entities/account'

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {

}
