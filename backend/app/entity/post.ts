import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import user from './user'

@Entity()
export class post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: true
    })
    @ManyToOne(() => user, user => user.id)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user_id: number

    @Column()
    title: string

    @Column({ unique: true })
    path: string

    @Column()
    content: string

    @Column()
    description: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn({ nullable: true })
    updated_at: Date

    @Column({ nullable: true })
    archived_at: Date

    @Column({ nullable: true })
    hidden_at: Date

    @Column()
    published_at: Date
}
export default post