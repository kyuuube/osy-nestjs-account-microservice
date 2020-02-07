import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  TreeChildren, 
  Tree, 
  TreeParent
} from 'typeorm'
import { IsString, IsNotEmpty } from 'class-validator'

@Entity()
@Tree('materialized-path')
export class Menu {
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
  public url: string

  @TreeChildren()
  children: Menu[];
  @TreeParent()
  parent: Menu;

  @CreateDateColumn({
    type: 'timestamp',
  })
  public createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp',
  })
  public updatedAt: Date
}
