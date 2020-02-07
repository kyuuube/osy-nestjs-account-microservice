import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  TreeChildren,
  Tree,
  TreeParent,
  PrimaryColumn,
} from 'typeorm'
import { IsString, IsNotEmpty } from 'class-validator'

@Entity()
@Tree('materialized-path')
export class Menu {
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
    length: 128,
    default: '',
  })
  @IsString()
  public url: string

  @Column({
    length: 128,
    default: '',
  })
  @IsString()
  public icon: string

  @TreeChildren()
  children: Menu[]
  @TreeParent()
  parent: Menu

  @CreateDateColumn({
    type: 'timestamp',
  })
  public createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp',
  })
  public updatedAt: Date
}
