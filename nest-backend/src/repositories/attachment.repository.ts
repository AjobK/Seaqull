import { EntityRepository, Repository } from 'typeorm'
import { Attachment } from '../entities/attachment'

@EntityRepository(Attachment)
export class AttachmentRepository extends Repository<Attachment> {

}
