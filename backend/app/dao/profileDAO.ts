import DatabaseConnector from '../service/databaseConnector';
import { Profile } from '../entity/profile';
import Attachment from '../entity/attachment';

class ProfileDAO {
    public async getProfileByUsername(username: string): Promise<Profile> {
        const repositoryAccount = await DatabaseConnector.getRepository('Account')
        const account = await repositoryAccount.findOne({ where: { user_name: username }, relations: ['profile'] })
        return !account ? null : account.profile
    }

    public async getProfileAttachment(profileId: number): Promise<Attachment> {
        const repositoryProfile = await DatabaseConnector.getRepository('Profile')
        const profile = await repositoryProfile.findOne({ where: { id: profileId }, relations: ['avatar_attachment'] })
        return !profile.avatar_attachment ? null : profile.avatar_attachment
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
