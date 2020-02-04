import { Controller, Logger, UsePipes } from '@nestjs/common'
import { AuthService } from './auth.service'
import { MessagePattern } from '@nestjs/microservices'
import { CreateAuthUserDto } from './auth.dto'
import { ValidationPipe } from '../common/validation/account.validation.pipe'

@Controller()
export class AuthController {
  private logger = new Logger('Account service')
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'login' })
  public login(data: any) {
    this.logger.log('log in' + data)
    return this.authService.getHello()
  }

  @UsePipes(new ValidationPipe())
  @MessagePattern({ cmd: 'signUp' })
  public signUp(createAuthUserDto: CreateAuthUserDto) {
    this.logger.log(createAuthUserDto)
    return this.authService.createUser(createAuthUserDto)
  }

  @MessagePattern({ cmd: 'sum' })
  // Define the logic to be executed
  async accumulate(data: number[]) {
    this.logger.log('Adding ' + data.toString()) // Log something on every call
    return this.authService.accumulate(data) // use math service to calc result & return
  }
}
