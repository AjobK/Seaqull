import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { User } from './user'
import post from './post'

@Entity('post_like')
export class PostLike extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: number

    @ManyToOne(() => post, post => post.id)
    @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
    post: post

    @Column()
    liked_at: Date
}
export default PostLike
