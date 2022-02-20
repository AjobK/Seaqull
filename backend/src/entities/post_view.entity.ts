import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { Post } from './post.entity'

@Entity('post_view')
@Unique(['post', 'ip'])
export class PostView {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Post, (post) => post.id)
    @JoinColumn({ name: 'post', referencedColumnName: 'id' })
    post: Post

    @Column()
    ip: string
}
