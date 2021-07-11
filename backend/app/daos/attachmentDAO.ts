import DatabaseConnector from '../utils/databaseConnector'
import Attachment from '../entities/attachment'

class attachmentDAO {
    public async saveAttachment(attachment: Attachment): Promise<Attachment> {
        const repository = await DatabaseConnector.getRepository('Attachment')
        const createdAttachment = await repository.save(attachment)

        return createdAttachment
    }

    public async getAttachment(id: number): Promise<Attachment> {
        const repository = await DatabaseConnector.getRepository('Attachment')
        const attachment = await repository.findOne({where: { id: id }})
        return attachment
    }
    public async getDefaultAvatarAttachment(): Promise<Attachment> {
        const repository = await DatabaseConnector.getRepository('Attachment')
        return await repository.findOne({where: {id: 1}})
    }
    public async getDefaultBannerAttachment(): Promise<Attachment> {
        const repository = await DatabaseConnector.getRepository('Attachment')
        return await repository.findOne({where: {id: 2}})
    }

}

export default attachmentDAO
