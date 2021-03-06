import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import User from './user'

@Entity('comment')
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User

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
export default Comment