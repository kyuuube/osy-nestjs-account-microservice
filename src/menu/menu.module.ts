import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MenuController } from './menu.controller'
import { MenuService } from './menu.service'
import { Menu } from './menu.entity'
import { UserRole } from '../auth/entity/user.role.entity'
import { Role } from '../role/role.entity'

@Module({
    controllers: [MenuController],
    imports: [TypeOrmModule.forFeature([Menu, UserRole, Role])],
    providers: [MenuService]
})
export class MenuModule {}
