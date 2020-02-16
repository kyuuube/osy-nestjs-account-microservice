import * as crypto from 'crypto'
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IsString, IsNotEmpty } from 'class-validator'
import { Exclude } from 'class-transformer'
import { Gender } from '../enum/gender.enum'

@Entity()
export class AuthUser {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    default: '',
    length: 100,
  })
  public email: string

  @CreateDateColumn({
    type: 'timestamp',
  })
  public createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp',
  })
  public updatedAt: Date

  @Column({
    length: 75,
  })
  @IsString()
  @Exclude()
  public password: string

  @Column({
    length: 128,
  })
  @IsString()
  @Exclude()
  public passwordSalt: string

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.NotAvailable,
  })
  public gender!: Gender

  @Column({
    length: 128,
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  public name: string

  @Column({
    length: 256,
    default: 'https://i.loli.net/2020/02/06/KVJBWRw4LD1teZI.jpg',
  })
  @IsNotEmpty()
  @IsString()
  public avatar: string

  @BeforeInsert()
  public async hashPasswordWithSalt() {
    const salt = this.generateRandomSalt(128)
    this.passwordSalt = salt
    this.password = crypto
      .createHmac('sha256', salt)
      .update(this.password)
      .digest('hex')
  }

  private generateRandomSalt(length: number): string {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length)
  }
}
