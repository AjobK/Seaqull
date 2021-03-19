import DatabaseConnector from '../util/databaseConnector';
import { Profile } from '../entity/profile';

class ProfileDAO {
    public async getProfileByUsername(username: string): Promise<Profile> {
        const repositoryAccount = await DatabaseConnector.getRepository('Account')
        const account = await repositoryAccount.findOne({ where: { user_name: username }, relations: ['profile'] })
        return !account ? null : account.profile
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