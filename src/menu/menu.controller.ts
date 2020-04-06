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
    public createMenu(dto: MenuDto) {
        return this.menuService.createMenu(dto)
    }

    @UsePipes(new ValidationPipe())
    @MessagePattern({ cmd: 'edit menu' })
    public editMenu(dto: MenuDto) {
        return this.menuService.editMenu(dto)
    }

    @MessagePattern({ cmd: 'del menu' })
    public deleteMenu(id: string) {
        return this.menuService.deleteMenu(id)
    }

    @MessagePattern({ cmd: 'menu detail' })
    public menuDetail(id: string) {
        return this.menuService.menuDetail(id)
    }

    @MessagePattern({ cmd: 'menu list' })
    public getMenuList(dto: PaginationDto) {
        return this.menuService.menuList(dto)
    }

    @MessagePattern({ cmd: 'menu tree' })
    public getMenuTree() {
        return this.menuService.menuTree()
    }

    @MessagePattern({ cmd: 'menu' })
    public getMenu(user: any) {
        return this.menuService.getMenu(user)
    }

    @MessagePattern({ cmd: 'menus' })
    public getMenus() {
        this.logger.log(666)
        return this.menuService.menuFlatList()
    }
}
