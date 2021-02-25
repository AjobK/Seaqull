import DatabaseConnector from '../util/databaseConnector';
import { user } from '../entity/user';

class UserDao {
    public async getUserByUsername(username: string): Promise<user> {
        const repositoryAccount = await DatabaseConnector.getRepositoryAccount();
        const account = await repositoryAccount.findOne({ user_name: username });

        const repositoryUser = await DatabaseConnector.getRepositoryUser();
        const user = await repositoryUser.findOne({ account_id: account });
        return user;
    }
}
export default UserDao;