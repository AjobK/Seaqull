import { Column, Entity, JoinColumn, Unique, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Profile } from './profile.entity'
import { Post } from './post.entity'

@Entity('post_like')
@Unique(['profile', 'post'])
export class PostLike {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Profile, (profile) => profile.id)
    @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
    profile: Profile

    @ManyToOne(() => Post, (post) => post.id)
    @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
    post: Post

    @Column()
    liked_at: Date
}
