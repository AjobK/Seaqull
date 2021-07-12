import { define } from 'typeorm-seeding'
import { Attachment } from '../entities/attachment'
import * as Faker from 'faker'

define(Attachment, (faker: typeof Faker, settings: { name: string }): Attachment => {
    const attachment = new Attachment()
    attachment.path = settings.name

    return attachment
})
