import DatabaseConnector from '../util/databaseConnector';
import { title } from '../entity/title';

class TitleDAO {
    public async getTitleById(id: number): Promise<title[]> {
        const repository = await DatabaseConnector.getRepositoryPost();
        const title = await repository.findOne({ id: id });
        return title;
    }
}
export default TitleDAO;