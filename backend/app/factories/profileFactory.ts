import * as Faker from 'faker'
import { define, factory } from 'typeorm-seeding'
import title from '../entity/title'
import { Profile } from '../entity/profile'

define(Profile, (faker: typeof Faker): Profile => {
    const profileFake = new Profile()


    const createdTitle = factory(title)() as any
    profileFake.title = createdTitle

    profileFake.avatar_attachment = null
    profileFake.created_at = new Date()
    profileFake.custom_path = faker.random.uuid()
    profileFake.display_name = 'root'
    profileFake.experience = 0
    profileFake.rows_scrolled = 0
    profileFake.description = '{"blocks":[{"key":"dvnp","text":"i`m a wild seaqull","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
    return profileFake
})
