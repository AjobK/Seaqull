import { Factory, Seeder } from 'typeorm-seeding'
import Attachment from '../entity/attachment'

export default class CreateAttachment implements Seeder {
    public async run(factory: Factory): Promise<any> {
        await factory(Attachment)('default/defaultAvatar.jpg').createMany(1)
        await factory(Attachment)('default/defaultBanner.jpg').createMany(1)
    }
}
