import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleController } from './role.controller'
import { RoleService } from './role.service'
import { Role } from './role.entity'

@Module({
  controllers: [RoleController],
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleService],
})
export class RoleModule {}
