import * as Faker from 'faker'
import { define, factory } from 'typeorm-seeding'
import title from '../entity/title'
import { Profile } from '../entity/profile'

define(Profile, (faker: typeof Faker): Profile => {
    const profileFake = new Profile()

    // userFake.account_id = createdAccount.id

    const createdTitle = factory(title)() as any
    // userFake.title_id = createdTitle.id
    profileFake.title = createdTitle

    profileFake.avatar_attachment = null
    profileFake.created_at = new Date()
    profileFake.custom_path = faker.random.uuid()
    profileFake.display_name = 'root'
    profileFake.experience = 0
    profileFake.rows_scrolled = 0
    profileFake.description = ' i`m a wild seaqull'
    return profileFake
})
