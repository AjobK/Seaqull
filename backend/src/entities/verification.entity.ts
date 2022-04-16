import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('verification')
export class Verification {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    code: string

    @Column({ nullable: false })
    expires_at: Date
}
