import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm'
import { IsString, IsNotEmpty } from 'class-validator'
import { Menu } from '../menu/menu.entity'

@Entity()
export class Role {
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

  @ManyToMany(
    type => Menu,
    menu => menu.roles
  )
  menus: Menu[]
}
