import { define } from 'typeorm-seeding'
import { Role } from '../entity/role'
import * as Faker from 'faker'

define(Role, (faker: typeof Faker):Role => {
    const roleFake = new Role()
    roleFake.name = faker.random.word()
    roleFake.created_at = new Date()
    return roleFake
})
