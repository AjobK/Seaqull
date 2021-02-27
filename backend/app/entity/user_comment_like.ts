import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import comment from './comment'
import { user } from './user'

@Entity()
export class user_comment_like extends BaseEntity {
    @ManyToOne(() => user, user => user.id)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    @PrimaryColumn()
    user_id: number

    @ManyToOne(() => comment, comment => comment.id)
    @JoinColumn({ name: 'comment_id', referencedColumnName: 'id' })
    @PrimaryColumn()
    comment_id: number

    @Column()
    liked_at: Date
}
export default user_comment_like