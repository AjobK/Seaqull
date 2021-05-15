import DatabaseConnector from '../util/databaseConnector'
import { Profile } from '../entity/profile'
import ProfileFollowedBy from '../entity/profile_followed_by'

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
