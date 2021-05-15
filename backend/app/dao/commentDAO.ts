import DatabaseConnector from '../util/databaseConnector'
import { Comment } from '../entity/comment'

class CommentDAO {
    private repo = 'Comment'

    public async getComments(path: string): Promise<Comment[]> {
        const repository = await DatabaseConnector.getRepository(this.repo)

        const commentList = await repository.find({ where: { path: path, archived_at: null }, relations: ['profile'], order: { id: 'DESC', }, })

        return commentList
    }

    public async getComment(id: number): Promise<Comment> {
        const repository = await DatabaseConnector.getRepository(this.repo)

        return await repository.findOne({ where: { id: id }, relations: ['profile'], order: { id: 'DESC', }, })
    }

    public async createComment(newComment: Comment): Promise<any> {
        const repository = await DatabaseConnector.getRepository(this.repo)

        return repository.save(newComment)
    }

    public async archiveComment(id: number): Promise<any> {
        const repository = await DatabaseConnector.getRepository(this.repo)
        const archiveDate = new Date()

        const comment: Comment = await repository.findOne({ where: { id: id } })
        const children: Comment[] = await repository.find({ where: { parent_comment_id : id } })

        comment.archived_at = archiveDate

        if(children) {
            children.forEach(child => {
                child.archived_at = archiveDate
            })

            repository.save(children)
        }

        return repository.save(comment)
    }
}

export default CommentDAO
