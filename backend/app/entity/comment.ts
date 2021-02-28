import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import user from './user'

@Entity()
export class comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => user, user => user.id)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: number

    @Column()
    path: string

    @Column()
    content: string

    @CreateDateColumn({ nullable: true })
    created_at: Date

    @UpdateDateColumn({ nullable: true })
    updated_at: Date

    @Column({ nullable: true })
    archived_at: Date
}
export default comment