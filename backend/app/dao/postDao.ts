import DatabaseConnector from '../util/databaseConnector'
import { Post } from '../entity/post'
import { PostLike } from '../entity/post_like'

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

    public async likePost(like: PostLike): Promise<any> {
        const repository = await DatabaseConnector.getRepository('PostLike')
        return repository.save(like)
    }
}
export default PostDAO
