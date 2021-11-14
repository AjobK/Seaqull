import { define, factory } from 'typeorm-seeding'
import { Account } from '../entities/account'
import role from '../entities/role'
import Profile from '../entities/profile'
import * as Faker from 'faker'
import Attachment from '../entities/attachment'

define(Account, (faker: typeof Faker, settings: { role: role, profilePic: Attachment, bannerPic: Attachment }) => {
  const acc = new Account()
  const name = settings.role.name
  const createdRole = settings.role
  const createdUser = factory(Profile)({
    display_name: name,
    profilePic: settings.profilePic,
    bannerPic: settings.bannerPic
  }) as any

  acc.profile = createdUser
  acc.role = createdRole
  acc.user_name = name
  acc.email = name.toLocaleLowerCase() + '@seaqull.com'
  acc.last_ip = '127.0.0.1'
  acc.login_attempts_counts = 0
  acc.locked_to = null
  acc.password = '$2b$10$Ex8Tdpd079JyRvIDhVB1s.OvlKco1T2WKCRoBYJst81KDNuT8VBAS'

  const today = new Date()
  acc.email_verified_at = today
  acc.changed_pw_at = today

  return acc
})
