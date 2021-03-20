import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Account } from './account'
import { Post } from './post'

@Entity('post_like')
export class PostLike extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Account, user => user.id)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: Account

    @ManyToOne(() => Post, post => post.id)
    @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
    post: Post

    @Column()
    liked_at: Date
}
export default PostLike
