import DatabaseConnector from '../util/databaseConnector'
import { Post } from '../entity/post'

class PostDAO {
    public async getPosts(skipSize: string, amount: number): Promise<Post[]> {
        const repository = await DatabaseConnector.getRepository('Post')
        const skipAmount = parseInt(skipSize) * amount;
        const postList = repository.find({ take : amount, skip: skipAmount })
        return postList
    }

    public async getAmountPosts(): Promise<number>{
        const repository = await DatabaseConnector.getRepository('Post')
        return await repository.count()
    }

    public async getOwnedPosts(decodedId: number): Promise<Post> {
        const repository = await DatabaseConnector.getRepository('Post')
        const postList = await repository.find({ where: { user_id: decodedId }, relations: ['user'] })
        return postList
    }

    public async getPostByPath(path: string): Promise<Post> {
        const repository = await DatabaseConnector.getRepository('Post')
        const foundPost = await repository.findOne({ where: { path: path }, relations: ['user'] })
        return foundPost
    }

    public async createPost(newPost: Post): Promise<any> {
        const repository = await DatabaseConnector.getRepository('Post')
        return repository.save(newPost)
    }

    public async updatePost(post: Post): Promise<any> {
        const repository = await DatabaseConnector.getRepository('Post')
        const newPost = await repository.save(post)
        return newPost;
    }
}
export default PostDAO