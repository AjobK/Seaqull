import { EntityRepository, Repository } from 'typeorm'
import { Title } from '../entities/title.entity'

@EntityRepository(Title)
export class TitleRepository extends Repository<Title> {
  public async getTitleByTitleId(id: number): Promise<Title> {
    return await this.findOne({ id })
  }
}
