import DatabaseConnector from '../util/databaseConnector'
import { Comment } from '../entity/comment'

class CommentDAO {
    private repo = 'Comment'

    public async getComments(path: string): Promise<Comment[]> {
        const repository = await DatabaseConnector.getRepository(this.repo)

        const commentList = await repository.find({ where: { path: path }, relations: ['profile'], order: { id: 'DESC', }, })

        return commentList
    }

    public async createComment(newComment: Comment): Promise<any> {
        const repository = await DatabaseConnector.getRepository(this.repo)

        return repository.save(newComment)
    }
}

export default CommentDAO