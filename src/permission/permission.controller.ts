import { Controller, Logger, UsePipes } from '@nestjs/common'
import { PermissionService } from './permission.service'
import { MessagePattern } from '@nestjs/microservices'
import { ValidationPipe } from '../common/validation/account.validation.pipe'
import { PermissionDto } from './permisssion.dto'

@Controller('permission')
export class PermissionController {
  private logger = new Logger('Account service')
  constructor(private readonly permissionService: PermissionService) {}

  @UsePipes(new ValidationPipe())
  @MessagePattern({ cmd: 'create perm' })
  public createMenu(dto: PermissionDto) {
    return this.permissionService.createPerm(dto)
  }
}
