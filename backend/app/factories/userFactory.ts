import * as Faker from 'faker'
import { define, factory } from 'typeorm-seeding'
import title from '../entity/title'
import { User } from '../entity/user'

define(User, (faker: typeof Faker, settings: { display_name: string }): User => {
    const userFake = new User()

    const createdTitle = factory(title)() as any

    userFake.display_name = settings.display_name || 'no_name'
    userFake.title = createdTitle
    userFake.avatar_attachment = null
    userFake.created_at = new Date()
    userFake.custom_path = faker.random.uuid()
    userFake.experience = 0
    userFake.rows_scrolled = 0

    return userFake
})
