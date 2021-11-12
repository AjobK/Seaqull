import { EntityRepository, Repository } from 'typeorm'
import { ProfileFollowedBy } from '../entities/profile_followed_by.entity'

@EntityRepository(ProfileFollowedBy)
export class ProfileFollowedByRepository extends Repository<ProfileFollowedBy> {

}
