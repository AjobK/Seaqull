import { define, factory } from 'typeorm-seeding'
import { Account } from '../entity/account'
import role from '../entity/role'
import Profile from '../entity/profile';

define(Account, () => {
    const acc = new Account()
    const name = 'rootAdmin'
    const createdRole = factory(role)({ name: 'RootAdmin' }) as any
    const createdUser = factory(Profile)({ display_name: name }) as any

    acc.profile = createdUser
    acc.role = createdRole
    acc.user_name = name
    acc.email = name + '@gmail.com'
    acc.last_ip = '127.0.0.1'
    acc.login_attempts_counts = 0
    acc.locked_to = null
    acc.password = '$2b$10$Ex8Tdpd079JyRvIDhVB1s.OvlKco1T2WKCRoBYJst81KDNuT8VBAS'

    const today = new Date()
    acc.email_verified_at = today
    acc.changed_pw_at = today
    return acc
})
