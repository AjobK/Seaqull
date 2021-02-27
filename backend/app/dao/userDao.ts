import DatabaseConnector from '../util/databaseConnector';
import { user } from '../entity/user';

class UserDao {
    public async getUserByUsername(username: string): Promise<user> {
        const repositoryAccount = await DatabaseConnector.getRepositoryAccount()
        const account = await repositoryAccount.findOne({ user_name: username })

        const repositoryUser = await DatabaseConnector.getRepositoryUser()
        const user = await repositoryUser.findOne({ account_id: account })
        return user
    }

    public async getUserByEmail(email: string): Promise<user> {
        const repositoryAccount = await DatabaseConnector.getRepositoryAccount()
        const account = await repositoryAccount.findOne({ email: email })

        const repositoryUser = await DatabaseConnector.getRepositoryUser()
        const user = await repositoryUser.findOne({ account_id: account })
        return user
    }
    public async saveUser(u: user): Promise<user>{
        const repositoryUser = await DatabaseConnector.getRepositoryUser()
        const user = await repositoryUser.save(u)
        console.log(user)
        return user
    }
}
export default UserDao