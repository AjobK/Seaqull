import { EntityRepository, Repository } from 'typeorm'
import { PostHasAttachment } from '../entities/post_has_attachment'

@EntityRepository(PostHasAttachment)
export class PostHasAttachmentRepository extends Repository<PostHasAttachment> {

}
