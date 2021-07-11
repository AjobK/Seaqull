import * as Faker from 'faker'
import { define, factory } from 'typeorm-seeding'
import title from '../entities/title'
import { Profile } from '../entities/profile'
import Attachment from '../entities/attachment'

define(Profile, (faker: typeof Faker, settings: { display_name: string, profilePic: Attachment }): Profile => {
    const profileFake = new Profile()

    const createdTitle = factory(title)() as any
    profileFake.title = createdTitle

    profileFake.avatar_attachment = settings.profilePic
    profileFake.banner_attachment = factory(Attachment)('default/defaultBanner.jpg') as any
    profileFake.created_at = new Date()
    profileFake.custom_path = faker.random.uuid()
    profileFake.display_name = settings.display_name || 'root'
    profileFake.experience = 0
    profileFake.rows_scrolled = 0
    profileFake.description = 'Welcome to my profile!'

    return profileFake
})
