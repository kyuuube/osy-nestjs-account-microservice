import { Controller, Logger } from '@nestjs/common'
import { AppService } from './app.service'
import { MessagePattern } from '@nestjs/microservices'

@Controller()
export class AppController {
  private logger = new Logger('Account service')
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'login' })
  public login(data: any) {
    this.logger.log('log in' + data)
    return this.appService.getHello()
  }

  @MessagePattern({ cmd: 'sum' })
  // Define the logic to be executed
  async accumulate(data: number[])  {
    this.logger.log('Adding ' + data.toString()); // Log something on every call
    return this.appService.accumulate(data); // use math service to calc result & return
  }
}
