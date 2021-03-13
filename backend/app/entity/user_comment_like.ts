import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import comment from './comment'
import { User } from './user'

@Entity('user_comment_like')
export class UserCommentLike extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: number

    @ManyToOne(() => comment, comment => comment.id)
    @JoinColumn({ name: 'comment_id', referencedColumnName: 'id' })
    comment: comment

    @Column()
    liked_at: Date
}
export default UserCommentLike