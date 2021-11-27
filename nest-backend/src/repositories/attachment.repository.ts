import { EntityRepository, Repository } from 'typeorm'
import { Attachment } from '../entities/attachment.entity'
import DatabaseConnector from "../../../backend/app/utils/databaseConnector";

@EntityRepository(Attachment)
export class AttachmentRepository extends Repository<Attachment> {

  public async saveAttachment(attachment: Attachment): Promise<Attachment> {
    const createdAttachment = await this.save(attachment)

    return createdAttachment
  }

  public async getDefaultThumbnailAttachment(): Promise<Attachment> {
    return await this.findOne({ where: { id: 3 } })
  }
}
