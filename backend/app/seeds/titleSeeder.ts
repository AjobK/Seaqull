import { Factory, Seeder } from 'typeorm-seeding'
import title from '../entity/title'

export default class CreateTitle implements Seeder {
    public async run(factory: Factory): Promise<any> {
        await factory(title)().create()
    }
}