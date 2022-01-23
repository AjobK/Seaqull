import { EntityRepository, Repository } from 'typeorm'
import { Attachment } from '../entities/attachment.entity'

@EntityRepository(Attachment)
export class AttachmentRepository extends Repository<Attachment> {

  public async saveAttachment(attachment: Attachment): Promise<Attachment> {
    const createdAttachment = await this.save(attachment)

    return createdAttachment
  }

  public async getDefaultAvatarAttachment(): Promise<Attachment> {
    return await this.findOne({ where: { id: 1 } })
  }

  public async getDefaultBannerAttachment(): Promise<Attachment> {
    return await this.findOne({ where: { id: 2 } })
  }

  public async getDefaultThumbnailAttachment(): Promise<Attachment> {
    return await this.findOne({ where: { id: 3 } })
  }
}
