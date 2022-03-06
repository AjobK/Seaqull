import { define } from 'typeorm-seeding'
import { Post } from '../../entities/post.entity'
import * as Faker from 'faker'
import { Profile } from '../../entities/profile.entity'
import { Attachment } from '../../entities/attachment.entity'

define(Post, (faker: typeof Faker, settings: { profile: Profile, thumbnailPic: Attachment }): Post => {
  const postFake = new Post()

  postFake.profile = settings.profile
  postFake.content = faker.lorem.paragraphs(3)
  postFake.description = faker.lorem.sentence(~~(Math.random() * 7) + 3)
  postFake.title = faker.lorem.sentence(~~(Math.random() * 4) + 2)
  postFake.path = faker.random.uuid()
  postFake.thumbnail_attachment = settings.thumbnailPic

  const today = new Date()

  postFake.created_at = today
  postFake.published_at = today

  return postFake
})
