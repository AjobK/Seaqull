import * as Faker from 'faker'
import { define, factory } from 'typeorm-seeding'
import { Title } from '../../entities/title.entity'
import { Profile } from '../../entities/profile.entity'
import { Attachment } from '../../entities/attachment.entity'

define(Profile, (
  faker: typeof Faker,
  settings: { display_name: string, profilePic: Attachment, bannerPic: Attachment }
): Profile => {
  const profileFake = new Profile()

  const createdTitle = factory(Title)() as any
  profileFake.title = createdTitle

  profileFake.avatar_attachment = settings.profilePic
  profileFake.banner_attachment = settings.bannerPic
  profileFake.created_at = new Date()
  profileFake.custom_path = faker.random.uuid()
  profileFake.display_name = settings.display_name || 'root'
  profileFake.rows_scrolled = 0
  profileFake.description = 'Welcome to my profile!'

  return profileFake
})
