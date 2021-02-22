import DatabaseConnector from '../util/databaseConnector';
import { account } from '../entity/account';

class accountDao {
    public async getUserByUsername( username:string ): Promise<account> {
        const repository = await DatabaseConnector.getRepositoryAccount();
        const account = await repository.findOne({ user_name: username });
        return account;
    }

    public async updateAccount(acc: account): Promise<void> {
        const repository = await DatabaseConnector.getRepositoryAccount();
        await repository.save(acc);
    }
}
export default accountDao;