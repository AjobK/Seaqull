import { define } from 'typeorm-seeding'
import AccountSettings from '../entities/accountSettings'

define(AccountSettings, ():AccountSettings => {
  const setting = new AccountSettings()
  setting.active = true

  return setting
})
