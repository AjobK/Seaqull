import DatabaseConnector from '../util/databaseConnector'
import { Account } from '../entity/account'

class AccountDAO {
    public async getAccountByUsername( username:string ): Promise<Account> {
        const repository = await DatabaseConnector.getRepository('Account')
        const account = await repository.findOne({ where: {user_name: username}, relations: ['profile'] })
        return account
    }

    public async saveAccount(acc: Account): Promise<Account> {
        const repository = await DatabaseConnector.getRepository('Account')
        const createdAccount = await repository.save(acc)
        return createdAccount
    }

    public async updateAccount(acc: Account): Promise<void> {
        const repository = await DatabaseConnector.getRepository('Account')
        await repository.save(acc)
    }
}
export default AccountDAO
