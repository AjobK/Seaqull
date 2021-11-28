import { EntityRepository, Repository } from 'typeorm'
import { Profile } from '../entities/profile.entity'
import {Title} from '../entities/title.entity'

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  public async getProfileByUsername(username: string): Promise<Profile> {
    const profile = this.findOne({ where: { username } })

    return profile
  }

  public async saveProfile(profile: Profile): Promise<void> {
    await this.save(profile)
  }

  public async getTitleByUserId(id: number): Promise<Title> {
    const user = await this.findOne({ where: { id: id }, relations: ['title'] })

    return !user ? null : user.title
  }
}
