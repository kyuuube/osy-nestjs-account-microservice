import { Injectable, Logger, HttpStatus } from '@nestjs/common'
import { Role } from './role.entity'
import { Menu } from '../menu/menu.entity'
import { Repository, Any } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { RoleDto } from './role.dto'
import { PaginationDto } from '../common/dto/pagination.dto'
import snowflake from '../common/snowflake'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>
  ) {}

  private logger = new Logger('RoleService')

  public async createRole(dto: RoleDto) {
    const snowflakeId: string = snowflake.generate()
    dto.id = snowflakeId
    const role = Object.assign(new Role(), dto)
    const menus = await this.menuRepository.findByIds(dto.menuIdList)
    role.menus = menus
    await this.roleRepository.save(role)
    return {
      code: HttpStatus.OK,
    }
  }

  public async editRole(dto: RoleDto) {
    await this.roleRepository.update(dto.id, dto)

    return {
      code: HttpStatus.OK,
    }
  }

  public async deleteRole(id: string) {
    await this.roleRepository.delete(id)

    return {
      code: HttpStatus.OK,
    }
  }

  public async roleDetail(id: string) {
    const role = await this.roleRepository.findOne({ id })
    return {
      code: HttpStatus.OK,
      role,
    }
  }

  public async roleList(params: PaginationDto) {
    const roles = await this.roleRepository
      .createQueryBuilder('c')
      .where('c.name like :name')
      .setParameters({
        name: `%${params.keywords ? params.keywords : ''}%`, // 用户名模糊查询
      })
      .orderBy('c.id', 'DESC')
      .skip(params.page)
      .take(params.pageSize)
      .getManyAndCount()

    return {
      code: HttpStatus.OK,
      data: roles[0],
      total: roles[1],
    }
  }
}
