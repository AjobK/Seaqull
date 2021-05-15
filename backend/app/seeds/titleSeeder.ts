import { Factory, Seeder } from 'typeorm-seeding'
import Title from '../entity/title'

export default class CreateTitle implements Seeder {
    public async run(factory: Factory): Promise<any> {
        await factory(Title)().create()
    }
}
