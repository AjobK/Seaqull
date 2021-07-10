import DatabaseConnector from '../utils/databaseConnector'
import Ban from '../entities/ban'

class BanDAO {
    public async saveBan(ban: Ban): Promise<Ban> {
        const repository = await DatabaseConnector.getRepository('Ban')
        const createdBan = await repository.save(ban)

        return createdBan
    }

    public async getBan(id: number): Promise<Ban> {
        const repository = await DatabaseConnector.getRepository('Ban')
        const ban = await repository.findOne({ where: { id: id } })

        return ban
    }
}

export default BanDAO
