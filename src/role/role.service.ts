import { Injectable, Logger, HttpStatus } from '@nestjs/common'
import { Role } from './role.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { RoleDto } from './role.dto'
import { PaginationDto } from '../common/dto/pagination.dto'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  private logger = new Logger('RoleService')

  public async createRole(dto: RoleDto) {
    await this.roleRepository.save(Object.assign(new Role(), dto))

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

  public async deleteRole(id: number) {
    await this.roleRepository.delete(id)

    return {
      code: HttpStatus.OK,
    }
  }

  public async roleDetail(id: number) {
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
