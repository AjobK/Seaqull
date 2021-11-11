import { EntityRepository, Repository } from 'typeorm'
import { CommentHasAttachment } from '../entities/comment_has_attachment'

@EntityRepository(CommentHasAttachment)
export class CommentHasAttachmentRepository extends Repository<CommentHasAttachment> {

}
