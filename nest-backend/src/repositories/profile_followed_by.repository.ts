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

  public async isFollowing(profileFollowedBy: ProfileFollowedBy): Promise<boolean> {
    const foundFollow = await this.findOne(profileFollowedBy)

    return !!foundFollow
  }

  public async follow(profileFollowedBy: ProfileFollowedBy): Promise<boolean> {
    const foundFollow = await this.findOne(profileFollowedBy)

    if (!foundFollow) {
      await this.save(profileFollowedBy)

      return !foundFollow
    }

    await this.remove(foundFollow)

    return !foundFollow
  }
}
