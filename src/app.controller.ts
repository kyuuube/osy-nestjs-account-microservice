import { Controller, Logger, UsePipes } from '@nestjs/common'
import { AppService } from './app.service'
import { MessagePattern } from '@nestjs/microservices'
import { CreateAuthUserDto } from './app.dto'
import { ValidationPipe } from './common/validation/account.validation.pipe'

@Controller()
export class AppController {
  private logger = new Logger('Account service')
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'login' })
  public login(data: any) {
    this.logger.log('log in' + data)
    return this.appService.getHello()
  }

  @UsePipes(new ValidationPipe())
  @MessagePattern({ cmd: 'signUp' })
  public signUp(createAuthUserDto: CreateAuthUserDto) {
    this.logger.log(createAuthUserDto)
    return 'hello'
  }

  @MessagePattern({ cmd: 'sum' })
  // Define the logic to be executed
  async accumulate(data: number[])  {
    this.logger.log('Adding ' + data.toString()); // Log something on every call
    return this.appService.accumulate(data); // use math service to calc result & return
  }
}
