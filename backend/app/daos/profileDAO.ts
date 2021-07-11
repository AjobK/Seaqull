import DatabaseConnector from '../utils/databaseConnector'
import { Profile } from '../entities/profile'
import Attachment from '../entities/attachment'
import ProfileFollowedBy from '../entities/profile_followed_by'

class ProfileDAO {
    public async getProfileByUsername(username: string): Promise<Profile> {
        const repositoryAccount = await DatabaseConnector.getRepository('Account')
        const account = await repositoryAccount.findOne({ where: { user_name: username }, relations: ['profile'] })
        return !account ? null : account.profile
    }

    public async getProfileAttachments(profileId: number): Promise<{ avatar: Attachment, banner: Attachment }> {
        const repositoryProfile = await DatabaseConnector.getRepository('Profile')
        const avatar = await repositoryProfile.findOne({ where: { id: profileId }, relations: ['avatar_attachment'] })
        const banner = await repositoryProfile.findOne({ where: { id: profileId }, relations: ['banner_attachment'] })
        return {
            avatar: avatar.avatar_attachment,
            banner: banner.banner_attachment
        }
    }

    public async getUserByEmail(email: string): Promise<Profile> {
        const repositoryAccount = await DatabaseConnector.getRepository('Account')
        const account = await repositoryAccount.findOne({ email: email })
        return !account ? null : account.profile
    }

    public async saveProfile(u: Profile): Promise<Profile>{
        const repositoryProfile = await DatabaseConnector.getRepository('Profile')
        const profile = await repositoryProfile.save(u)
        return profile
    }

    public async follow(profileFollowedBy: ProfileFollowedBy): Promise<any> {
        const repository = await DatabaseConnector.getRepository('ProfileFollowedBy')

        const foundFollow = await repository.findOne(profileFollowedBy)

        if (!foundFollow)
            await repository.save(profileFollowedBy)
        else
            await repository.delete(profileFollowedBy)

        return !foundFollow
    }

    public async isFollowing(profileFollowedBy: ProfileFollowedBy): Promise<any> {
        const repository = await DatabaseConnector.getRepository('ProfileFollowedBy')

        const foundFollow = await repository.findOne(profileFollowedBy)

        return !!foundFollow
    }
}

export default ProfileDAO
