import { define } from 'typeorm-seeding'
import { Attachment } from '../entity/attachment'

define(Attachment, (): Attachment => {
    const attachment = new Attachment()
    attachment.path = 'profile/default/default.jpg'

    return attachment
})
