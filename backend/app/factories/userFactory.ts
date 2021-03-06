import * as Faker from 'faker'
import { define, factory } from 'typeorm-seeding'
import { Account } from '../entity/account'
import title from '../entity/title'
import { User } from '../entity/user'

define(User, (faker: typeof Faker): User => {
    const userFake = new User()

    const createdAccount = factory(Account)() as any
    userFake.account = createdAccount
    // userFake.account_id = createdAccount.id

    const createdTitle = factory(title)() as any
    // userFake.title_id = createdTitle.id
    userFake.title = createdTitle

    userFake.avatar_attachment = null
    userFake.created_at = new Date()
    userFake.custom_path = faker.random.uuid()
    userFake.display_name = faker.name.firstName()
    userFake.experience = 0
    userFake.rows_scrolled = 0

    return userFake
})
