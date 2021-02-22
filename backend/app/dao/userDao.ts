import DatabaseConnector from '../util/databaseConnector';
import { post } from '../entity/post';

class UserDao {
    public async getUserByUsername(username: string): Promise<post[]> {
        const repositoryAccount = await DatabaseConnector.getRepositoryAccount();
        const account = await repositoryAccount.findOne({ user_name: username });

        const repositoryUser = await DatabaseConnector.getRepositoryUser();
        const user = await repositoryUser.findOne({ account_id: account });
        return user;
    }
}
export default UserDao;