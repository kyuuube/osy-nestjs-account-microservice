import { Injectable, HttpStatus, UnauthorizedException } from '@nestjs/common'
import { CreateAuthUserDto } from './dto/createAuthUser.dto'
import { VerifyUserByEmailDto } from './dto/verifyUser.dto'
import { AuthUser } from './auth.entity'
import { RpcException } from '@nestjs/microservices'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import * as crypto from 'crypto'
import { cacheManager } from '../redis'
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthUser)
    private readonly authUserRepository: Repository<AuthUser>
  ) {}
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

  public async verifyAuthUserByEmail(dto: VerifyUserByEmailDto) {
    const auth = await this.authUserRepository.findOne({ email: dto.email })
    if (!auth) {
      throw new RpcException(
        new UnauthorizedException('User with provided email does not exist')
      )
    }

    const passHash = crypto
      .createHmac('sha256', auth.passwordSalt)
      .update(dto.password)
      .digest('hex')
    if (auth.password === passHash) {
      return this.toPublicUser(auth)
    } else {
      throw new RpcException(new UnauthorizedException('Password is incorrect'))
    }
  }

  private toPublicUser(auth: AuthUser): any {
    const { password, passwordSalt, ...publicUser } = auth
    cacheManager.set(
      publicUser.id,
      publicUser,
      { ttl: 1000 },
      (err, result) => {
        console.log(result)
      }
    )
    return publicUser
  }
}
