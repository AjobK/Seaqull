import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('post_has_attachment')
export class PostHasAttachment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    path: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn({ nullable: true })
    updated_at: Date

    @Column({ nullable: true })
    archived_at: Date
}

export default PostHasAttachment
