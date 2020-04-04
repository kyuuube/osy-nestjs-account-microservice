import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthController } from './auth.controller'
import { AuthUser } from './entity/auth.entity'
import { UserRole } from './entity/user.role.entity'
import { AuthService } from './auth.service'

@Module({
    controllers: [AuthController],
    imports: [TypeOrmModule.forFeature([AuthUser, UserRole])],
    providers: [AuthService]
})
export class AuthModule {}
