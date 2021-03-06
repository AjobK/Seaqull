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