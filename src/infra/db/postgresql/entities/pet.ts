import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import AccountEntity from './account'

@Entity('pet')
class PetEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @ManyToOne(() => AccountEntity, (account) => account.pets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'account_id' })
  account: AccountEntity

  @Column()
  birth_date: Date

  @CreateDateColumn({ name: 'created_at' })
  cratedAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}

export default PetEntity
