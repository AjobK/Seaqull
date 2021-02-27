import { define, factory } from 'typeorm-seeding'
import { account } from '../entity/account'
import role from '../entity/role'

define(account, () => {
    const acc = new account()

    const createRole = factory(role)() as any
    acc.role = createRole
    acc.user_name = 'user'
    acc.email = 'user@gmail.com'
    acc.last_ip = '127.0.0.1'
    acc.login_attempts_counts = 0
    acc.locked_to = null
    acc.password = '$2b$10$Ex8Tdpd079JyRvIDhVB1s.OvlKco1T2WKCRoBYJst81KDNuT8VBAS'

    const today = new Date()
    acc.email_verified_at = today
    acc.changed_pw_at = today
    return acc
})
