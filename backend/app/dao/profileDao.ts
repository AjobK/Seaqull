import DatabaseConnector from '../util/databaseConnector';
import { Profile } from '../entity/profile';

class ProfileDAO {
    public async getProfileByUsername(username: string): Promise<Profile> {
        const repositoryAccount = await DatabaseConnector.getRepository('Account')
        const account = await repositoryAccount.findOne({ user_name: username })

        const repositoryProfile= await DatabaseConnector.getRepository('Profile')

        const profile = await repositoryProfile.findOne({ where: { account: account }, relations: ['title'] })
        return profile
    }

    public async getUserByEmail(email: string): Promise<Profile> {
        const repositoryAccount = await DatabaseConnector.getRepository('Account')
        const account = await repositoryAccount.findOne({ email: email })

        const repositoryProfile = await DatabaseConnector.getRepository('Profile')
        const profile = await repositoryProfile.findOne({ account: account })
        return profile
    }

    public async saveProfile(u: Profile): Promise<Profile>{
        const repositoryProfile = await DatabaseConnector.getRepository('Profile')
        const profile = await repositoryProfile.save(u)
        return profile
    }
}
export default ProfileDAO