import { Injectable, HttpStatus } from '@nestjs/common'
import { CreateAuthUserDto } from './auth.dto'
import { AuthUser } from './auth.entity'
import { RpcException } from '@nestjs/microservices'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthUser)
    private readonly authUserRepository: Repository<AuthUser>
  ) {}
  public getHello(): string {
    return 'Hello World!'
  }

  public accumulate(data: number[]): number {
    return (data || []).reduce((a, b) => Number(a) + Number(b))
  }

  public async createUser(
    createAuthUserDto: CreateAuthUserDto
  ): Promise<AuthUser> {
    const emailUser = await this.authUserRepository.findOne({
      email: createAuthUserDto.email,
    })
    if (emailUser) {
      throw new RpcException({
        message: 'User with provided email or phone number already exists',
        status: HttpStatus.CONFLICT,
      })
    }

    return this.toPublicUser(
      await this.authUserRepository.save(
        Object.assign(new AuthUser(), createAuthUserDto)
      )
    )
  }

  private toPublicUser(auth: AuthUser): any {
    const { password, passwordSalt, ...publicUser } = auth
    return publicUser
  }
}
