import DatabaseConnector from '../util/databaseConnector';
import { post } from '../entity/post';
class PostDAO {
    public async getPosts(): Promise<post[]> {
        const repository = await DatabaseConnector.getRepositoryPost();
        const postList = await repository.find();
        return postList;
    }

    public async createPost(): Promise<any> {
        const repository = await DatabaseConnector.getRepositoryPost();
        
    }
}
export default PostDAO;