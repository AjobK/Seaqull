import { EntityRepository, Repository } from 'typeorm'
import { ProfileCommentLike } from '../entities/profile_comment_like'

@EntityRepository(ProfileCommentLike)
export class ProfileCommentLikeRepository extends Repository<ProfileCommentLike> {

}
