import { Factory, Seeder } from 'typeorm-seeding'
import { Account } from '../entity/account'
import Post from '../entity/post';

export default class CreateAccount implements Seeder {
    public async run(factory: Factory): Promise<any> {
        await factory(Account)()
            .map(async (account: Account) => {
                await factory(Post)({ user: account.user }).create()

                return account
            }).createMany(5)
    }
}