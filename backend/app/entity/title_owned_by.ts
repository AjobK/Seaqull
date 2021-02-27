import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import title from './title'
import user from './user'

@Entity()
export class title_owned_by extends BaseEntity {
    @ManyToOne(() => user, user => user.id)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    @PrimaryColumn()
    user_id: number

    @ManyToOne(() => title, title => title.id)
    @JoinColumn({ name: 'title_id', referencedColumnName: 'id' })
    @PrimaryColumn()
    title_id: number
}
export default title_owned_by