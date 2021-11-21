import { define } from 'typeorm-seeding'
import AccountSettings from '../entities/account_settings'

define(AccountSettings, ():AccountSettings => {
  const accSetting = new AccountSettings()
  accSetting.active = true

  return accSetting
})
