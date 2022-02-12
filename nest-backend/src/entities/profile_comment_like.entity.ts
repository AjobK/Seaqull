import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Comment } from './comment.entity'
import { Profile } from './profile.entity'

@Entity('profile_comment_like')
export class ProfileCommentLike {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Profile, (Profile) => Profile.id)
    @JoinColumn({ name: 'profile', referencedColumnName: 'id' })
    profile: Profile

    @ManyToOne(() => Comment, (comment) => comment.id)
    @JoinColumn({ name: 'comment_id', referencedColumnName: 'id' })
    comment: Comment

    @Column()
    liked_at: Date
}
