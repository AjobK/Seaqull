import DatabaseConnector from '../util/databaseConnector';
import { post } from '../entity/post';
class PostDao {
    public async getPosts(): Promise<post[]> {
        const repository = await DatabaseConnector.getRepositoryPost();
        const postList = await repository.find();
        return postList;
    }
}
export default PostDao;