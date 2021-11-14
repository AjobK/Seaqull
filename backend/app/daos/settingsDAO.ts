import AccountSettings from '../entities/accountSettings'
import DatabaseConnector from '../utils/databaseConnector'

class SettingsDAO {
  public async updateActiveState(setting: AccountSettings): Promise<AccountSettings> {
    const repository = await DatabaseConnector.getRepository('AccountSettings')
    const accountSettings = await repository.save(setting)

    return accountSettings
  }
}

export default SettingsDAO
