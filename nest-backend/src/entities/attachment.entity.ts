import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('attachment')
export class Attachment {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    path: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @Column({ nullable: true })
    archived_at: Date
}
