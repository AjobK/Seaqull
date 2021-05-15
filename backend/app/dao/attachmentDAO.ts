import DatabaseConnector from '../util/databaseConnector'
import Attachment from '../entity/attachment';

class attachmentDAO {
    public async saveAttachment(attachment: Attachment): Promise<Attachment> {
        const repository = await DatabaseConnector.getRepository('Attachment')
        const createdAttachment = await repository.save(attachment)

        return createdAttachment
    }

    public async getAttachment(id: number): Promise<Attachment> {
        const repository = await DatabaseConnector.getRepository('Attachment')
        const attachment = await repository.findOne({ where: { id: id } })
        return attachment
    }
}

export default attachmentDAO
