import { Setting } from '../entities/setting'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Setting)
export class SettingRepository extends Repository<Setting> {

}
