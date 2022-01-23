import { Setting } from '../entities/setting.entity'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Setting)
export class SettingRepository extends Repository<Setting> {

}
