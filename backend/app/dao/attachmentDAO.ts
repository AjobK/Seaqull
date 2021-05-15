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
        const attachment = await repository.findOne({where: {id: id}})
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
