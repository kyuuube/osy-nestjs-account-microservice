import { Injectable, Logger, HttpStatus } from '@nestjs/common'
import { Permission } from './permission.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { PermissionDto } from './permisssion.dto'
import { PaginationDto } from '../common/dto/pagination.dto'
import snowflake from '../common/snowflake'

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permRepository: Repository<Permission>
  ) {}

  private logger = new Logger('MenuService')

  public async createPerm(dto: PermissionDto) {
    const snowflakeId: string = snowflake.generate()
    dto.id = snowflakeId
    const tmp = Object.assign(new PermissionDto(), dto)
    await this.permRepository.save(tmp)

    return {
      code: HttpStatus.OK,
    }
  }

  public async deletePerm(id: string) {
    await this.permRepository.delete(id)

    return {
      code: HttpStatus.OK,
    }
  }

  public async editPerm(dto: PermissionDto) {
    await this.permRepository.update(dto.id, dto)

    return {
      code: HttpStatus.OK,
    }
  }

  public async permDetail(id: string) {
    const role = await this.permRepository.findOne({ id })
    return {
      code: HttpStatus.OK,
      role,
    }
  }

  public async permList(params: PaginationDto) {
    const roles = await this.permRepository
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
