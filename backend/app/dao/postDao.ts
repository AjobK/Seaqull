import DatabaseConnector from '../util/databaseConnector';
import { post } from '../entity/post';
class PostDAO {
    public async getPosts(): Promise<post[]> {
        const repository = await DatabaseConnector.getRepositoryPost();
        const postList = await repository.find();
        return postList;
    }

    public async getPostByPath(path: string): Promise<post> {
        const repository = await DatabaseConnector.getRepositoryPost();
        const foundPost =  await repository.findOne({ path: path });

        return foundPost;
    }

    public async createPost(newPost: post): Promise<any> {
        const repository = await DatabaseConnector.getRepositoryPost();

        return repository.save(newPost)
    }
}
export default PostDAO;