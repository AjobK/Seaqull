import * as Faker from 'faker'
import { define, factory } from 'typeorm-seeding'
import title from '../entity/title'
import { Profile } from '../entity/profile'
import Attachment from "../entity/attachment";

define(Profile, (faker: typeof Faker, settings: { display_name: string }): Profile => {
    const profileFake = new Profile()

    const createdTitle = factory(title)() as any
    profileFake.title = createdTitle

    profileFake.avatar_attachment = null
    profileFake.banner_attachment = null
    profileFake.created_at = new Date()
    profileFake.custom_path = faker.random.uuid()
    profileFake.display_name = settings.display_name || 'root'
    profileFake.experience = 0
    profileFake.rows_scrolled = 0
    profileFake.description = 'Welcome to my profile!'

    return profileFake
})
