import DatabaseConnector from '../utils/databaseConnector'
import ArchivedPost from '../entities/archivedPost'

class archivedPostDAO {
    public async saveArchivedPost(archivedPost: ArchivedPost): Promise<ArchivedPost> {
        const repository = await DatabaseConnector.getRepository('ArchivedPost')
        const createdArchivedPost = await repository.save(archivedPost)

        return createdArchivedPost
    }
}

export default archivedPostDAO
