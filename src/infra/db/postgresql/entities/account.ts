import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import PetEntity from './pet'

@Entity('accounts')
class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  first_name: string

  @Column()
  last_name: string

  @Column({ unique: true })
  email: string

  @OneToMany((type) => PetEntity, (pet) => pet.account, { eager: true })
  pets: PetEntity[]

  @CreateDateColumn({ name: 'created_at' })
  cratedAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}

export default AccountEntity
