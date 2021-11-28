import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProfileRepository } from '../repositories/profile.repository'
import { ProfileFollowedByRepository } from '../repositories/profile_followed_by.repository'
import { Title } from '../entities/title.entity'
import { ProfileFollowedBy } from '../entities/profile_followed_by.entity'
import { AccountRepository } from '../repositories/account.repository'
import { BanRepository } from '../repositories/ban.repository'
import { TitleRepository } from '../repositories/title.repository'

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository) private readonly profileRepository: ProfileRepository,
    @InjectRepository(AccountRepository) private readonly accountRepository: AccountRepository,
    @InjectRepository(BanRepository) private readonly banRepository: BanRepository,
    @InjectRepository(TitleRepository) private readonly titleRepository: TitleRepository,
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

  public async getProfile(username: string): Promise<any> {
    const profile = await this.profileRepository.getProfileByUsername(username)

    if (!profile) throw new NotFoundException('Profile not found')

    const account = await this.accountRepository.getAccountByUsername(profile.display_name)

    const ban = await this.banRepository.checkIfUserIsBanned(account)

    if (ban) throw new ForbiddenException({ errors: [ban] })

    const title: Title = (await this.profileRepository.getTitleByUserId(profile.id)) || null

    const followerCount = await this.profileFollowedByRepository.getFollowersCount(profile.id)

    // TODO: Figure out a way to pass both with an authorized user and without

    let following = false
    let followsYou = false

    if (!isOwner && decodedToken && decodedToken.username) {
      const currentProfile: ProfileFollowedBy = new ProfileFollowedBy()
      const loggedInProfile: ProfileFollowedBy = new ProfileFollowedBy()

      const followingProfile = await this.dao.getProfileByUsername(decodedToken.username)

      currentProfile.follower = followingProfile.id
      currentProfile.profile = profile.id

      loggedInProfile.follower = profile.id
      loggedInProfile.profile = followingProfile.id

      following = await this.dao.isFollowing(currentProfile)
      followsYou = await this.dao.isFollowing(loggedInProfile)
    }

    const payload = {
      isOwner: isOwner,
      following: following,
      followsYou: followsYou,
      username: receivedUsername,
      title: title ? title.name : 'Title not found...',
      description: profile.description,
      followerCount,
    }
    const attachments = await this.dao.getProfileAttachments(profile.id)

    if (attachments.avatar) payload['avatar'] = 'http://localhost:8000/' + attachments.avatar.path

    if (attachments.banner) payload['banner'] = 'http://localhost:8000/' + attachments.banner.path

    return res.status(200).json({ profile: payload })
  }
}
