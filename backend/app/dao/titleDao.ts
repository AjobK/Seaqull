import DatabaseConnector from '../util/databaseConnector'
import { Title } from '../entity/title'

class TitleDAO {
    public async getTitleById(id: number): Promise<Title> {
        const repository = await DatabaseConnector.getRepository('Title');
        const title = await repository.findOne({ id: id })
        return title
    }
}
export default TitleDAO