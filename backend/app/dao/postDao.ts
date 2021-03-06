import DatabaseConnector from '../util/databaseConnector'
import { Post } from '../entity/post'

class PostDAO {
    public async getPosts(): Promise<Post[]> {
        const repository = await DatabaseConnector.getRepositoryPost()
        const postList = await repository.find()
        return postList
    }

    public async getPostByPath(path: string): Promise<Post> {
        const repository = await DatabaseConnector.getRepositoryPost()
        const foundPost = await repository.findOne({ path: path })

        return foundPost
    }

    public async createPost(newPost: Post): Promise<any> {
        const repository = await DatabaseConnector.getRepositoryPost()

        return repository.save(newPost)
    }
}
export default PostDAO