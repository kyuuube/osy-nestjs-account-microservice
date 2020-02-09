import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IsString, IsNotEmpty } from 'class-validator'

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    length: 128,
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  public name: string

  @Column({
    length: 128,
    default: '',
  })
  @IsString()
  public description: string

  @Column({
    length: 128,
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  public status: string

  @CreateDateColumn({
    type: 'timestamp',
  })
  public createdAt: string

  @UpdateDateColumn({
    type: 'timestamp',
  })
  public updatedAt: string
}
