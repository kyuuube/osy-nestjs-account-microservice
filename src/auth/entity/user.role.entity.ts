import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    default: '',
    length: 100,
  })
  public roleId: string

  @Column({
    default: '',
    length: 100,
  })
  public userId: string
}
