import DatabaseConnector from '../util/databaseConnector'
import { Post } from '../entity/post'

class PostDAO {
    public async getPosts(): Promise<Post[]> {
        const repository = await DatabaseConnector.getRepository('Post')
        const postList = await repository.find()
        return postList
    }

    public async getPostByPath(path: string): Promise<Post> {
        const repository = await DatabaseConnector.getRepository('Post')
        const foundPost = await repository.findOne({ path: path })

        return foundPost
    }

    public async createPost(newPost: Post): Promise<any> {
        const repository = await DatabaseConnector.getRepository('Post')
        return repository.save(newPost)
    }

    public async likePost(postId, userId): Promise<any> {
        const repository = await DatabaseConnector.getRepository('Post')
        repository.save()
    }
}
export default PostDAO
