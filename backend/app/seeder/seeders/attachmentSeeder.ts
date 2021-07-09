import { Factory } from 'typeorm-seeding'
import Attachment from '../../entities/attachment'

module.exports = async (factory: Factory) => {
    return await factory(Attachment)().create()
}