import { Module } from '@nestjs/common'
import { PermissionController } from './permission.controller'
import { PermissionService } from './permission.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Permission } from './permission.entity'

@Module({
  controllers: [PermissionController],
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [PermissionService],
})
export class PermissionModule {}
