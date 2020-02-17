import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleController } from './role.controller'
import { RoleService } from './role.service'
import { Role } from './role.entity'
import { Menu } from '../menu/menu.entity'
import { UserRole } from '../auth/entity/user.role.entity'
import { Permission } from '../permission/permission.entity'

@Module({
  controllers: [RoleController],
  imports: [TypeOrmModule.forFeature([Role, Menu, Permission, UserRole])],
  providers: [RoleService],
})
export class RoleModule {}
