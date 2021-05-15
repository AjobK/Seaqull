import { define } from 'typeorm-seeding'
import { Attachment } from '../entity/attachment'
import * as Faker from 'faker'

define(Attachment, (faker: typeof Faker, path: string): Attachment => {
    const attachment = new Attachment()
    attachment.path = path

    return attachment
})
