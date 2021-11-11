import { EntityRepository, Repository } from 'typeorm'
import { ProfileActivity } from '../entities/profile_activity'

@EntityRepository(ProfileActivity)
export class ProfileActivityRepository extends Repository<ProfileActivity> {

}
