import { Factory, Seeder } from 'typeorm-seeding'
import Attachment from '../entity/attachment'

export default class CreateAttachment implements Seeder {
    public async run(factory: Factory): Promise<any> {
        await factory(Attachment)().createMany(1)
    }
}