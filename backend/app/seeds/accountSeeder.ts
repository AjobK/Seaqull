import { Factory, Seeder } from 'typeorm-seeding'
import { Account } from '../entity/account'

export default class CreateAccount implements Seeder {
    public async run(factory: Factory): Promise<any> {
        await factory(Account)(1).create()
    }
}