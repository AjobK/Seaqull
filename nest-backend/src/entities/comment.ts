import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Post } from './post'
import { Profile } from './profile'

@Entity('comment')
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Profile, (profile) => profile.id)
    @JoinColumn({ name: 'profile', referencedColumnName: 'id' })
    profile: Profile

    @ManyToOne(() => Post, (post) => post.id)
    @JoinColumn({ name: 'post', referencedColumnName: 'id' })
    post: Post

    @Column()
    content: string

    @Column({ nullable: true })
    @ManyToOne(() => Comment, (comment) => comment.id)
    @JoinColumn({ name: 'parent_comment_id', referencedColumnName: 'id' })
    parent_comment_id: Comment

    @CreateDateColumn({ nullable: true })
    created_at: Date

    @UpdateDateColumn({ nullable: true })
    updated_at: Date

    @Column({ nullable: true })
    archived_at: Date

    @Column({ nullable: true })
    is_pinned: boolean
}
