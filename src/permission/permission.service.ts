import { Injectable, Logger, HttpStatus } from '@nestjs/common'
import { Permission } from './permission.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { PermissionDto } from './permisssion.dto'
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
    this.logger.log(tmp)
    await this.permRepository.save(tmp)

    return {
      code: HttpStatus.OK,
    }
  }
}
