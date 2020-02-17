import { Controller, Logger, UsePipes } from '@nestjs/common'
import { RoleService } from './role.service'
import { MessagePattern } from '@nestjs/microservices'
import { ValidationPipe } from '../common/validation/account.validation.pipe'
import { RoleDto } from './role.dto'
import { PaginationDto } from '../common/dto/pagination.dto'

@Controller()
export class RoleController {
  private logger = new Logger('Account service')
  constructor(private readonly roleService: RoleService) {}

  @UsePipes(new ValidationPipe())
  @MessagePattern({ cmd: 'create role' })
  public createRole(dto: RoleDto) {
    return this.roleService.createRole(dto)
  }

  @UsePipes(new ValidationPipe())
  @MessagePattern({ cmd: 'edit role' })
  public editRole(dto: RoleDto) {
    return this.roleService.editRole(dto)
  }

  @MessagePattern({ cmd: 'del role' })
  public deleteRole(id: string) {
    return this.roleService.deleteRole(id)
  }

  @MessagePattern({ cmd: 'role detail' })
  public roleDetail(id: string) {
    return this.roleService.roleDetail(id)
  }

  @MessagePattern({ cmd: 'role list' })
  public getRoleList(dto: PaginationDto) {
    return this.roleService.roleList(dto)
  }

  @MessagePattern({ cmd: 'role permissions' })
  public getRolePermissons(dto: any) {
    return this.roleService.getRolesPermissions(dto)
  }
}
