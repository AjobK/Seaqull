import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProfileRepository } from '../repositories/profile.repository'
import { ProfileFollowedByRepository } from '../repositories/profile_followed_by.repository'

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository) private readonly profileRepository: ProfileRepository,
    @InjectRepository(ProfileFollowedByRepository)
      private readonly profileFollowedByRepository: ProfileFollowedByRepository,
  ) {
  }

  public async getFollowers(username: string): Promise<number[]> {
    const profile = await this.profileRepository.getProfileByUsername(username)

    if (!profile) throw new NotFoundException('Profile not found')

    const followersById = await this.profileFollowedByRepository.getFollowersByProfileId(profile.id)

    const followers = []

    followersById.forEach((entry) => {
      followers.push(entry.follower)
    })

    return followers
  }
}
