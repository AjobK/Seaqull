import { define } from 'typeorm-seeding'
import { role } from '../entity/role'

define(role, ():role => {
    const roleFake = new role()

    roleFake.id = 1
    roleFake.name = 'gebruiker'
    roleFake.created_at = new Date()
    return roleFake
})
