import DatabaseConnector from '../util/databaseConnector'
import { comment } from '../entity/comment'

class CommentDAO {
    public async getComments(path: string): Promise<comment[]> {
        const repository = await DatabaseConnector.getRepositoryComment()
        const commentList = await repository.find({ path: path })
        return commentList
    }

    public async createComment(newComment: comment): Promise<any> {
        const repository = await DatabaseConnector.getRepositoryComment()

        return repository.save(newComment)
    }
}

export default CommentDAO