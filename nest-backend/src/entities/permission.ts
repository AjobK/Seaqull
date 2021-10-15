import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('permission')
export class Permission extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
}
