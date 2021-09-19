import { Factory } from 'typeorm-seeding'
import Account from '../entities/account'
import Attachment from '../entities/attachment'
import { Post } from '../entities/post'
import Role from '../entities/role'

module.exports = async (factory: Factory, role: Role, profilePic: Attachment, bannerPic: Attachment) => {
  return await factory(Account)({ role: role, profilePic: profilePic, bannerPic: bannerPic })
    .map(async (account: Account) => {
      await factory(Post)({ profile: account.profile }).create()

      return account
    }).createMany(1)
}
