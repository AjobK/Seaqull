import DatabaseConnector from '../util/databaseConnector'
import { Title } from '../entity/title'

class TitleDAO {
    public async getTitleByTitleId(id: number): Promise<Title> {
        const repository = await DatabaseConnector.getRepository('Title');
        const title = await repository.findOne({ id: id })
        return title
    }
    public async getTitleByUserId(id: number): Promise<Title> {
        const repository = await DatabaseConnector.getRepository('Profile');
        const user = await repository.findOne({ where: { id: id }, relations: ['title'] })
        return !user ? null : user.title
    }

}
export default TitleDAO