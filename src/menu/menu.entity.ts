import {
    Column,
    CreateDateColumn,
    Entity,
    UpdateDateColumn,
    TreeChildren,
    Tree,
    TreeParent,
    PrimaryColumn,
    ManyToMany,
    JoinTable,
    JoinColumn
} from 'typeorm'
import { IsString, IsNotEmpty } from 'class-validator'
import { Role } from '../role/role.entity'

@Entity()
@Tree('materialized-path')
export class Menu {
    @PrimaryColumn({
        length: 128,
        default: ''
    })
    @IsNotEmpty()
    @IsString()
    public id: string

    @Column({
        length: 128,
        default: ''
    })
    @IsNotEmpty()
    @IsString()
    public name: string

    @Column({
        length: 128,
        default: ''
    })
    @IsString()
    public description: string

    @Column({
        length: 128,
        default: ''
    })
    @IsString()
    public url: string

    @Column({
        length: 128,
        default: ''
    })
    @IsString()
    public menuCode: string

    @Column({
        length: 128,
        default: ''
    })
    @IsString()
    public icon: string

    @TreeChildren()
    public children: Menu[]
    @Column({
        length: 128,
        default: null
    })
    parentId: string

    @TreeParent()
    @JoinColumn({ name: 'parent_id' })
    @TreeParent()
    public parent: Menu

    @CreateDateColumn({
        type: 'timestamp'
    })
    public createdAt: Date

    @UpdateDateColumn({
        type: 'timestamp'
    })
    public updatedAt: Date

    @ManyToMany(
        type => Role,
        role => role.menus
    )
    @JoinTable()
    roles: Role[]
}
