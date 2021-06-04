import { Connection, createConnection } from 'typeorm'

class DatabaseConnector {
    private static connection: Connection

    public static getRepository = async (entityName: string): Promise<any> => {
        if (DatabaseConnector.connection == null) {
            DatabaseConnector.connection = await createConnection()
        }

        const repository = DatabaseConnector.connection.getRepository(entityName)

        return repository
    }
}

export default DatabaseConnector
