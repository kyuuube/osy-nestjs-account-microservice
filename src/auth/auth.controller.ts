import { Controller, Logger, UsePipes } from '@nestjs/common'
import { AuthService } from './auth.service'
import { MessagePattern } from '@nestjs/microservices'
import { CreateAuthUserDto } from './dto/createAuthUser.dto'
import { VerifyUserByEmailDto } from './dto/verifyUser.dto'
import { ValidationPipe } from '../common/validation/account.validation.pipe'
import { PaginationDto } from '../common/dto/pagination.dto'

@Controller()
export class AuthController {
    private logger = new Logger('Account service')
    constructor(private readonly authService: AuthService) {}

    @UsePipes(new ValidationPipe())
    @MessagePattern({ cmd: 'validateUser' })
    public login(dto: VerifyUserByEmailDto) {
        return this.authService.verifyAuthUserByEmail(dto)
    }

    @UsePipes(new ValidationPipe())
    @MessagePattern({ cmd: 'signUp' })
    public signUp(createAuthUserDto: CreateAuthUserDto) {
        this.logger.log(createAuthUserDto)
        return this.authService.createUser(createAuthUserDto)
    }

    @MessagePattern({ cmd: 'user list' })
    public getUserList(dto: PaginationDto) {
        return this.authService.getUserList(dto)
    }

    @MessagePattern({ cmd: 'del user' })
    public deleteUser(id: string) {
        return this.authService.deleteUser(id)
    }

    @MessagePattern({ cmd: 'user detail' })
    public userDetail(id: number):Promise<any> {
        this.logger.log('kira')
        const user = this.authService.userDetail(id)
        return user
    }

    @MessagePattern({ cmd: 'edit user' })
    public userEdit(dto: CreateAuthUserDto) {
        return this.authService.editUser(dto)
    }
}
