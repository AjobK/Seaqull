import DatabaseConnector from '../service/databaseConnector'
import Attachment from '../entity/attachment';

class attachmentDAO {
    public async saveAttachment(attatchment: Attachment): Promise<Attachment> {
        const repository = await DatabaseConnector.getRepository('Attachment')
        const createdAttachment = await repository.save(attatchment)
        return createdAttachment
    }
    public async getAttachment(id: number): Promise<Attachment> {
        const repository = await DatabaseConnector.getRepository('Attachment')
        const attachment = await repository.findOne({ where: { id: id } })
        return attachment
    }
}
export default attachmentDAO