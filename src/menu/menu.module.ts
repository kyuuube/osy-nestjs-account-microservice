import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MenuController } from './menu.controller'
import { MenuService } from './menu.service'
import { Menu } from './menu.entity'

@Module({
  controllers: [MenuController],
  imports: [TypeOrmModule.forFeature([Menu])],
  providers: [MenuService],
})
export class MenuModule {}
