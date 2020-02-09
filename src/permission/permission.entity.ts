import {
  Column,
  BeforeInsert,
  Entity,
  BeforeUpdate,
  PrimaryColumn,
} from 'typeorm'
import { IsString, IsNotEmpty } from 'class-validator'
import { Exclude } from 'class-transformer'

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

  @Column({name: 'created_at',    nullable: false,
  readonly: true,
  default: () => '0',})
  public createdAt: number

  @Column({name: 'updated_at', nullable: true })
  @Exclude()

  public updatedAt: number

  @BeforeInsert()
  public updateDateCreation() {
    console.log('s')
    this.updatedAt = Math.floor(Date.now() / 1000);
  }

  @BeforeUpdate()
  public setUpdatedAt() {
    this.updatedAt = Math.floor(Date.now() / 1000);
  }


}
