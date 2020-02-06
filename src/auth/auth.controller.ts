import {
  Controller,
  Logger,
  UsePipes,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { MessagePattern } from '@nestjs/microservices'
import { CreateAuthUserDto } from './dto/createAuthUser.dto'
import { VerifyUserByEmailDto } from './dto/verifyUser.dto'
import { ValidationPipe } from '../common/validation/account.validation.pipe'

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
    return this.authService.createUser(createAuthUserDto)
  }
}
