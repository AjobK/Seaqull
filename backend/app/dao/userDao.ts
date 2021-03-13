import DatabaseConnector from '../util/databaseConnector';
import { User } from '../entity/user';

class UserDAO {
    public async getUserByUsername(username: string): Promise<User> {
        const repositoryAccount = await DatabaseConnector.getRepository('Account')
        const account = await repositoryAccount.findOne({ where: { user_name: username }, relations: ['user'] })
        return !account ? null : account.user
    }

    public async getUserByEmail(email: string): Promise<User> {
        const repositoryAccount = await DatabaseConnector.getRepository('Account')
        const account = await repositoryAccount.findOne({ where: { email: email }, relations: ['user'] })
        return !account ? null : account.user
    }

    public async saveUser(u: User): Promise<User>{
        const repositoryUser = await DatabaseConnector.getRepository('User')
        const user = await repositoryUser.save(u)
        return user
    }
}
export default UserDAO