import { Factory } from 'typeorm-seeding'
import { Account } from '../../entities/account.entity'
import { Attachment } from '../../entities/attachment.entity'
import { Post } from '../../entities/post.entity'
import { Role } from '../../entities/role.entity'

module.exports = async (
  factory: Factory, role: Role, profilePic: Attachment, bannerPic: Attachment, thumbnailPic: Attachment
) => {
  return await factory(Account)({ role: role, profilePic: profilePic, bannerPic: bannerPic })
    .map(async (account: Account) => {
      await factory(Post)({ profile: account.profile, thumbnailPic: thumbnailPic }).create()

      return account
    }).createMany(1)
}
