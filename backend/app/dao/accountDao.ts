import DatabaseConnector from '../util/databaseConnector'
import { Account } from '../entity/account'

class AccountDAO {
    public async getAccountByUsername( username:string ): Promise<Account> {
        const repository = await DatabaseConnector.getRepositoryAccount()
        const account = await repository.findOne({ user_name: username })
        return account
    }

    public async saveAccount(acc: Account): Promise<Account> {
        const repository = await DatabaseConnector.getRepositoryAccount()
        const createdAccount = await repository.save(acc)
        return createdAccount
    }

    public async updateAccount(acc: Account): Promise<void> {
        const repository = await DatabaseConnector.getRepositoryAccount()
        await repository.save(acc)
    }
}
export default AccountDAO