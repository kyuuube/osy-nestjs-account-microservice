import { Injectable, Logger, HttpStatus } from '@nestjs/common'
import { Role } from './role.entity'
import { Menu } from '../menu/menu.entity'
import { Permission } from '../permission/permission.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { RoleDto } from './role.dto'
import { PaginationDto } from '../common/dto/pagination.dto'
import snowflake from '../common/snowflake'
import { UserRole } from '../auth/entity/user.role.entity'
import { uniqBy } from 'lodash'
@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        @InjectRepository(Menu)
        private readonly menuRepository: Repository<Menu>,
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,

        @InjectRepository(UserRole)
        private readonly userRoleRepository: Repository<UserRole>
    ) {}

    private logger = new Logger('RoleService')

    public async createRole(dto: RoleDto) {
        const snowflakeId: string = snowflake.generate()
        dto.id = snowflakeId
        const role = Object.assign(new Role(), dto)
        const menus = await this.menuRepository.findByIds(dto.menuIdList)
        const permissions = await this.permissionRepository.findByIds(
            dto.permissionIdList
        )
        role.menus = menus
        role.permissions = permissions
        await this.roleRepository.save(role)
        return {
            code: HttpStatus.OK
        }
    }

    public async editRole(dto: RoleDto) {
        const role = Object.assign(new Role(), dto)
        const menus = await this.menuRepository.findByIds(dto.menuIdList)
        const permissions = await this.permissionRepository.findByIds(
            dto.permissionIdList
        )
        role.menus = menus
        role.permissions = permissions
        await this.roleRepository.save(role)

        return {
            code: HttpStatus.OK
        }
    }

    public async deleteRole(id: string) {
        await this.roleRepository.delete(id)

        return {
            code: HttpStatus.OK
        }
    }

    public async roleDetail(id: string) {
        const role = await this.roleRepository
            .createQueryBuilder('r')
            .leftJoinAndSelect('r.menus', 'menus')
            .leftJoinAndSelect('r.permissions', 'permissions')
            .where('r.id = :id', { id })
            .getOne()
        return {
            code: HttpStatus.OK,
            data: role
        }
    }

    public async roleList(params: PaginationDto) {
        const roles = await this.roleRepository
            .createQueryBuilder('c')
            .where('c.name like :name')
            .setParameters({
                name: `%${params.keywords ? params.keywords : ''}%` // 用户名模糊查询
            })
            .orderBy('c.id', 'DESC')
            .skip(params.page)
            .take(params.pageSize)
            .getManyAndCount()

        return {
            code: HttpStatus.OK,
            data: roles[0],
            total: roles[1]
        }
    }

    public async getRolesPermissions(data: any) {
        const roleList = await this.userRoleRepository.find({
            where: { userId: data.user.id }
        })

        this.logger.log(roleList)
        const permissions = await this.roleRepository
            .createQueryBuilder('r')
            .leftJoinAndSelect('r.permissions', 'mepermissionsnu')
            .getMany()

        this.logger.log(permissions)
        const list = permissions.filter(i =>
            roleList.some(r => r.roleId === i.id)
        )

        this.logger.log(list)
        let tempList: any[] = []

        list.forEach(i => {
            tempList = [...tempList, ...i.permissions]
        })

        tempList = uniqBy(tempList, 'id')

        return {
            code: HttpStatus.OK,
            data: tempList
        }
    }
}
