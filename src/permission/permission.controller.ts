import { Controller, Logger, UsePipes } from '@nestjs/common'
import { PermissionService } from './permission.service'
import { MessagePattern } from '@nestjs/microservices'
import { ValidationPipe } from '../common/validation/account.validation.pipe'
import { PermissionDto } from './permisssion.dto'
import { PaginationDto } from '../common/dto/pagination.dto'

@Controller('permission')
export class PermissionController {
  private logger = new Logger('Account service')
  constructor(private readonly permissionService: PermissionService) {}

  @UsePipes(new ValidationPipe())
  @MessagePattern({ cmd: 'create perm' })
  public createMenu(dto: PermissionDto) {
    return this.permissionService.createPerm(dto)
  }

  @UsePipes(new ValidationPipe())
  @MessagePattern({ cmd: 'edit perm' })
  public editMenu(dto: PermissionDto) {
    return this.permissionService.createPerm(dto)
  }

  @MessagePattern({ cmd: 'del perm' })
  public deleteRole(id: string) {
    return this.permissionService.deletePerm(id)
  }


  @MessagePattern({ cmd: 'perm detail' })
  public roleDetail(id: string) {
    return this.permissionService.permDetail(id)
  }

  @MessagePattern({ cmd: 'perm list' })
  public getRoleList(dto: PaginationDto) {
    return this.permissionService.permList(dto)
  }
}
