import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import title from './title'
import user from './user'

@Entity()
export class title_owned_by extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @ManyToOne(() => user, user => user.id)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: user

    @ManyToOne(() => title, title => title.id)
    @JoinColumn({ name: 'title_id', referencedColumnName: 'id' })
    title: title
}
export default title_owned_by