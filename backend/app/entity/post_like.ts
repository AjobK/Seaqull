import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user'
import { Post } from './post'

@Entity('post_like')
export class PostLike extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User

    @ManyToOne(() => Post, post => post.id)
    @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
    post: Post

    @Column()
    liked_at: Date
}
export default PostLike
