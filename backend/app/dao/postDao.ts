import DatabaseConnector from '../util/databaseConnector'
import {Post} from '../entity/post'
import {PostLike} from '../entity/post_like'
import User from "../entity/user";

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
        return await repository.save(like)
    }

    public async unlikePost(like: PostLike): Promise<any> {
        const repository = await DatabaseConnector.getRepository('PostLike')
        return await repository.delete(like)
    }

    public async getPostLikesById(id: number): Promise<any> {
        const repository = await DatabaseConnector.getRepository('PostLike')
        return await repository.find({ where: {post: id}, relations: ['post', 'user'] })
    }

    public async findLikeByPostAndUser(post: Post, user: User): Promise<any> {
        const repository = await DatabaseConnector.getRepository('PostLike')
        return await repository.findOne({ where: {post: post.id, user: user.id}, relations: ['post', 'user'] })
    }
}
export default PostDAO
