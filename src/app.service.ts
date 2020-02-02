import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  public getHello(): string {
    return 'Hello World!'
  }

  public accumulate(data: number[]): number {
    return (data || []).reduce((a, b) => Number(a) + Number(b));
}
}
