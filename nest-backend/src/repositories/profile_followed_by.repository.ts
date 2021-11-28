import { EntityRepository, Repository } from 'typeorm'
import { ProfileFollowedBy } from '../entities/profile_followed_by.entity'

@EntityRepository(ProfileFollowedBy)
export class ProfileFollowedByRepository extends Repository<ProfileFollowedBy> {

  public async getFollowersByProfileId(id: number): Promise<ProfileFollowedBy[]> {
    const followers = await this.find({
      where: { profile: id },
      relations: ['follower', 'follower.avatar_attachment', 'follower.title']
    })

    return followers
  }

  public async getFollowersCount(id: number): Promise<number> {
    const amountOfFollowers = await this.count({ where: { profile: id } })

    return amountOfFollowers
  }
}
