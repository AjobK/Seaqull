import { Connection, createConnection } from 'typeorm'
import Account from '../entity/account'
import Post from '../entity/post'
import Role from '../entity/role'
import Title from '../entity/title'
import User from '../entity/user'

class DatabaseConnector{
    private static connection: Connection

    // returns the post repository
    public static getRepositoryPost = async (): Promise<any> => {
        await DatabaseConnector.checkConnection()
        const repository = DatabaseConnector.connection.getRepository(Post)
        return repository
    }

    // returns the post repository
    public static getRepositoryRole = async (): Promise<any> => {
        await DatabaseConnector.checkConnection()
        const repository = DatabaseConnector.connection.getRepository(Role)
        return repository
    }

    // returns the account repository
    public static getRepositoryAccount = async (): Promise<any> => {
        await DatabaseConnector.checkConnection()
        const repository = DatabaseConnector.connection.getRepository(Account)
        return repository
    }

    // returns the account repository
    public static getRepositoryUser = async (): Promise<any> => {
        await DatabaseConnector.checkConnection()
        const repository = DatabaseConnector.connection.getRepository(User)
        return repository
    }

    // returns the post repository
    public static getRepositoryTitle = async (): Promise<any> => {
        await DatabaseConnector.checkConnection()
        const repository = DatabaseConnector.connection.getRepository(Title)
        return repository
    }

    private static checkConnection = async (): Promise<void> => {
        if(DatabaseConnector.connection == null){
            DatabaseConnector.connection = await createConnection()
        }
    }
}

export default DatabaseConnector
