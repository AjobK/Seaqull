import * as Faker from 'faker'
import { define, factory } from 'typeorm-seeding'
import { account } from '../entity/account'
import { user } from '../entity/user'

define(user, (faker: typeof Faker) => {
    const userFake = new user()

    userFake.id = faker.random.number(1)

    const createdAccount = factory(account)() as any
    userFake.account_id = createdAccount.id

    const createdTitle = factory(account)() as any
    userFake.title_id = createdTitle.id
    userFake.avatar_attachment = null

    userFake.created_at = new Date()
    userFake.custom_path = faker.random.uuid()
    userFake.display_name = 'root'
    userFake.experience = 0
    userFake.rows_scrolled = 0

    return userFake
})
