import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import user from './user'

@Entity('setting')
export class Setting extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => user, user => user.id)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: user

    @Column()
    key: string

    @Column()
    value: string
}
export default Setting