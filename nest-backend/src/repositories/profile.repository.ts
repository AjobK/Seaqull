import { EntityRepository, Repository } from 'typeorm'
import { Profile } from '../entities/profile.entity'
import { Title } from '../entities/title.entity'
import { Attachment } from '../entities/attachment.entity'

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  public async getProfileByUsername(username: string): Promise<Profile> {
    const profile = this.findOne({ where: { username } })

    return profile
  }

  public async saveProfile(profile: Profile): Promise<Profile> {
    const newProfile = await this.save(profile)

    return newProfile
  }

  public async getTitleByUserId(id: number): Promise<Title> {
    const user = await this.findOne({ where: { id: id }, relations: ['title'] })

    return !user ? null : user.title
  }

  public async getProfileAttachments(profileId: number): Promise<{ avatar: Attachment, banner: Attachment }> {
    const avatar = await this.findOne({ where: { id: profileId }, relations: ['avatar_attachment'] })
    const banner = await this.findOne({ where: { id: profileId }, relations: ['banner_attachment'] })

    return {
      avatar: avatar.avatar_attachment,
      banner: banner.banner_attachment
    }
  }

  public async profileAlreadyExists(email: string, username: string): Promise<boolean> {
    const emailExists = await this.findOne({ where: { email } })
    const usernameExists = await this.findOne({ where: { username } })

    return (emailExists ? true : !!usernameExists)
  }
}
