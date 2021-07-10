import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import attachment from './attachment'
import comment from './comment'

@Entity('comment_has_attatchment')
export class CommentHasAttachment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => comment)
    @JoinColumn({ name: 'comment_id', referencedColumnName: 'id' })
    comment: comment

    @OneToOne(() => attachment)
    @JoinColumn({ name: 'attachment_id', referencedColumnName: 'id' })
    attachment: attachment

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn({ nullable: true })
    updated_at: Date

    @Column({ nullable: true })
    archived_at: Date
}

export default CommentHasAttachment
