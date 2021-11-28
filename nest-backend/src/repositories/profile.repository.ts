import { EntityRepository, Repository } from 'typeorm'
import { Profile } from '../entities/profile.entity'

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  public async getProfileByUsername(username: string): Promise<Profile> {
    const profile = this.findOne({ where: { username } })

    return profile
  }

  public async saveProfile(profile: Profile): Promise<void> {
    await this.save(profile)
  }
}
