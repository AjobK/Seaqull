import { Factory, Seeder } from 'typeorm-seeding'
import { Profile } from '../entity/profile'

export default class CreateProfile implements Seeder {
    public async run(factory: Factory): Promise<any> {
        await factory(Profile)().create()
    }
}