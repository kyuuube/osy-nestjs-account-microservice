import {
  Column,
  UpdateDateColumn,
  Entity,
  CreateDateColumn,
  PrimaryColumn,
} from 'typeorm'
import { IsString, IsNotEmpty } from 'class-validator'

@Entity()
export class Permission {
  @PrimaryColumn({
    length: 128,
    default: '',
  })
  @IsNotEmpty()
  @IsString()
  public id: string

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
    type: 'int',
    default: 0,
  })
  public type: number

  @Column({
    length: 128,
    default: '',
  })
  @IsString()
  public path: string

  @Column({
    length: 128,
    default: '',
  })
  @IsString()
  public slug: string

  @Column({
    length: 128,
    default: '',
  })
  @IsString()
  public methods: string

  @CreateDateColumn({
    type: 'timestamp',
  })
  public createdAt: string

  @UpdateDateColumn({
    type: 'timestamp',
  })
  public updatedAt: string
}
