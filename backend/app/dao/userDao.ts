import DatabaseConnector from '../util/databaseConnector';
import { User } from '../entity/user';

class UserDao {
    public async getUserByUsername(username: string): Promise<User> {
        const repositoryAccount = await DatabaseConnector.getRepositoryAccount()
        const account = await repositoryAccount.findOne({ user_name: username })

        const repositoryUser = await DatabaseConnector.getRepositoryUser()

        const user = await repositoryUser.findOne({ where: { account: account }, relations: ['title'] })
        return user
    }

    public async getUserByEmail(email: string): Promise<User> {
        const repositoryAccount = await DatabaseConnector.getRepositoryAccount()
        const account = await repositoryAccount.findOne({ email: email })

        const repositoryUser = await DatabaseConnector.getRepositoryUser()
        const user = await repositoryUser.findOne({ account: account })
        return user
    }

    public async saveUser(u: User): Promise<User>{
        const repositoryUser = await DatabaseConnector.getRepositoryUser()
        const user = await repositoryUser.save(u)
        return user
    }
}
export default UserDao