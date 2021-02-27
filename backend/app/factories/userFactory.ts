import * as Faker from 'faker'
import { define, factory } from 'typeorm-seeding'
import { account } from '../entity/account'
import { user } from '../entity/user'

define(user, (faker: typeof Faker): user => {
    const userFake = new user()

    const createdAccount = factory(account)() as any
    userFake.account = createdAccount

    const createdTitle = factory(account)() as any
    userFake.title = createdTitle

    userFake.avatar_attachment = null
    userFake.created_at = new Date()
    userFake.custom_path = faker.random.uuid()
    userFake.display_name = 'root'
    userFake.experience = 0
    userFake.rows_scrolled = 0

    return userFake
})
