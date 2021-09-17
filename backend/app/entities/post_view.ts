import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm'
import Post from './post'

@Entity('post_view')
@Unique(['post', 'ip'])
export class PostView extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Post, (post) => post.id)
    @JoinColumn({ name: 'post', referencedColumnName: 'id' })
    post: Post

    @Column()
    ip: string
}

export default PostView
