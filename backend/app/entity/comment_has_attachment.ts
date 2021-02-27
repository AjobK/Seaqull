import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import attachment from './attachment'
import comment from './comment'

@Entity()
export class comment_has_attachment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => comment)
    @JoinColumn({ name: 'comment_id', referencedColumnName: 'id' })
    comment_id: number

    @OneToOne(() => attachment)
    @JoinColumn({ name: 'attachment_id', referencedColumnName: 'id' })
    attachment_id: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn({ nullable: true })
    updated_at: Date

    @Column({ nullable: true })
    archived_at: Date
}
export default comment_has_attachment