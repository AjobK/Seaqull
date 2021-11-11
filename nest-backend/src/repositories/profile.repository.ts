import { EntityRepository, Repository } from 'typeorm'
import { Profile } from '../entities/profile'

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {

}
