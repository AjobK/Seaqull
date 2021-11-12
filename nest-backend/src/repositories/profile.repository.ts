import { EntityRepository, Repository } from 'typeorm'
import { Profile } from '../entities/profile.entity'

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {

}
