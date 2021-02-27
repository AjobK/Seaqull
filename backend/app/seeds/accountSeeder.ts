import { Factory, Seeder } from 'typeorm-seeding'
import { account } from '../entity/account'

export default class CreateAccount implements Seeder {
    public async run(factory: Factory): Promise<any> {
        await factory(account)().create()
    }
}