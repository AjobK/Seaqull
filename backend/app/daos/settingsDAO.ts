import AccountSettings from '../entities/account_settings'
import DatabaseConnector from '../utils/databaseConnector'

class SettingsDAO {
  public async updateSettings(setting: AccountSettings): Promise<AccountSettings> {
    const repository = await DatabaseConnector.getRepository('AccountSettings')
    const accountSettings = await repository.save(setting)

    return accountSettings
  }

  public async getSettings(id: number): Promise<AccountSettings[]> {
    const repository = await DatabaseConnector.getRepository('AccountSettings')
    const settings = await repository.find({ where: { id: id } })

    return settings
  }
}

export default SettingsDAO
