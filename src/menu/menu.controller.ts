import { Controller, Logger, UsePipes } from '@nestjs/common'
import { MenuService } from './menu.service'
import { MessagePattern } from '@nestjs/microservices'
import { ValidationPipe } from '../common/validation/account.validation.pipe'
import { MenuDto } from './menu.dto'
import { PaginationDto } from '../common/dto/pagination.dto'

@Controller('menu')
export class MenuController {
  private logger = new Logger('Account service')
  constructor(private readonly menuService: MenuService) {}

  @UsePipes(new ValidationPipe())
  @MessagePattern({ cmd: 'create menu' })
  public createRole(dto: MenuDto) {
    return this.menuService.createMenu(dto)
  }

  @UsePipes(new ValidationPipe())
  @MessagePattern({ cmd: 'edit menu' })
  public editRole(dto: MenuDto) {
    return this.menuService.editMenu(dto)
  }

  @MessagePattern({ cmd: 'del menu' })
  public deleteRole(id: number) {
    return this.menuService.deleteMenu(id)
  }

  @MessagePattern({ cmd: 'menu detail' })
  public roleDetail(id: number) {
    return this.menuService.menuDetail(id)
  }

  @MessagePattern({ cmd: 'menu list' })
  public getRoleList(dto: PaginationDto) {
    return this.menuService.menuList(dto)
  }
}
