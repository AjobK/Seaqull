import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Profile } from './profile'
import { Post } from './post'

@Entity('post_like')
export class PostLike extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Profile, profile => profile.id)
    @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
    profile: Profile

    @ManyToOne(() => Post, post => post.id)
    @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
    post: Post

    @Column()
    liked_at: Date
}
export default PostLike
