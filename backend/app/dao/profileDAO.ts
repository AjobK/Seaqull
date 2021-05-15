import DatabaseConnector from '../service/databaseConnector';
import {Profile} from '../entity/profile';
import Attachment from '../entity/attachment';

class ProfileDAO {
    public async getProfileByUsername(username: string): Promise<Profile> {
        const repositoryAccount = await DatabaseConnector.getRepository('Account')
        const account = await repositoryAccount.findOne({ where: { user_name: username }, relations: ['profile'] })
        return !account ? null : account.profile
    }

    public async getProfileAttachments(profileId: number): Promise<{ avatar: Attachment, banner: Attachment }> {
        const repositoryProfile = await DatabaseConnector.getRepository('Profile')
        const avatar = await repositoryProfile.findOne({ where: { id: profileId }, relations: ['avatar_attachment'] })
        const banner = null
        return {
            avatar: avatar.avatar_attachment,
            banner
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
}
export default ProfileDAO
