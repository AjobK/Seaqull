import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Comment } from './comment'
import { Attachment } from './attachment';

@Entity('comment_has_attachment')
export class CommentHasAttachment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Comment)
    @JoinColumn({ name: 'comment_id', referencedColumnName: 'id' })
    comment: Comment

    @OneToOne(() => Attachment)
    @JoinColumn({ name: 'attachment_id', referencedColumnName: 'id' })
    attachment: Attachment

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn({ nullable: true })
    updated_at: Date

    @Column({ nullable: true })
    archived_at: Date
}
