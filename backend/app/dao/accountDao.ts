import DatabaseConnector from '../util/databaseConnector';
import { account } from '../entity/account';

class AccountDAO {
    public async getUserByUsername( username:string ): Promise<account> {
        const repository = await DatabaseConnector.getRepositoryAccount();
        const account = await repository.findOne({ user_name: username });
        return account;
    }

    public async saveAccount(acc: account): Promise<account> {
        const repository = await DatabaseConnector.getRepositoryAccount();
        const createdAccount = await repository.save(acc);
        return createdAccount;
    }

    public async updateAccount(acc: account): Promise<void> {
        const repository = await DatabaseConnector.getRepositoryAccount();
        await repository.save(acc);
    }
}
export default AccountDAO;