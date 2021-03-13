import DatabaseConnector from '../util/databaseConnector'
import { Post } from '../entity/post'

class PostDAO {
    public async getPosts(skipSize: string): Promise<Post[]> {
        const repository = await DatabaseConnector.getRepository('Post')
        const skipAmount = parseInt(skipSize) * 7;
        const postList = repository.find({ take : 7, skip: skipAmount })
        return postList
    }

    public async getAmountPosts(): Promise<number>{
        const repository = await DatabaseConnector.getRepository('Post')
        return await repository.count()
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
}
export default PostDAO