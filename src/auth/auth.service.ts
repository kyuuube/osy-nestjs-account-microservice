import {
    Injectable,
    HttpStatus,
    UnauthorizedException,
    Logger
} from '@nestjs/common'
import { CreateAuthUserDto } from './dto/createAuthUser.dto'
import { VerifyUserByEmailDto } from './dto/verifyUser.dto'
import { AuthUser } from './entity/auth.entity'
import { UserRole } from './entity/user.role.entity'
import { RpcException } from '@nestjs/microservices'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import * as crypto from 'crypto'
import { cacheManager } from '../redis'
import { PaginationDto } from '../common/dto/pagination.dto'
import { JsonData, ResponseData } from '../common/JsonData'
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthUser)
        private readonly authUserRepository: Repository<AuthUser>,

        @InjectRepository(UserRole)
        private readonly userRoleRepository: Repository<UserRole>
    ) {}

    private logger = new Logger('AuthService')
    public async createUser(
        createAuthUserDto: CreateAuthUserDto
    ): Promise<ResponseData> {
        this.logger.log(createAuthUserDto)
        const emailUser = await this.authUserRepository.findOne({
            email: createAuthUserDto.email
        })
        if (emailUser) {
            throw new RpcException({
                message:
                    'User with provided email or phone number already exists',
                status: HttpStatus.CONFLICT
            })
        }

        const publicUser = this.toPublicUser(
            await this.authUserRepository.save(
                Object.assign(new AuthUser(), createAuthUserDto)
            )
        )

        this.toSaveUserRoles(createAuthUserDto, publicUser.id)
        return JsonData.success(publicUser)
    }

    public async verifyAuthUserByEmail(dto: VerifyUserByEmailDto) {
        const auth = await this.authUserRepository.findOne({ email: dto.email })
        if (!auth) {
            throw new RpcException({
                message: 'User with provided email does not exist',
                statusCode: HttpStatus.UNAUTHORIZED
            })
        }

        const passHash = crypto
            .createHmac('sha256', auth.passwordSalt)
            .update(dto.password)
            .digest('hex')
        if (auth.password === passHash) {
            const roleIds = await this.findRoleIds(auth.id)
            return this.toPublicUser(auth, true, roleIds)
        } else {
            throw new RpcException(
                new UnauthorizedException('Password is incorrect')
            )
        }
    }

    private toPublicUser(
        auth: AuthUser,
        caching: boolean = false,
        roleIds?: string[]
    ): any {
        const { password, passwordSalt, ...publicUser } = auth
        if (caching) {
            cacheManager.set(
                publicUser.id,
                {
                    ...publicUser,
                    roleIds
                },
                { ttl: 1000 },
                (err, result) => {
                    this.logger.log({ result, err })
                }
            )
        }
        return { ...publicUser, roleIds }
    }

    private toSaveUserRoles(user: CreateAuthUserDto, userId: string) {
        if (user?.roleIds) {
            const ids = user.roleIds
            ids.forEach(id => {
                const userRole: UserRole = this.userRoleRepository.create({
                    userId,
                    roleId: id
                })
                this.userRoleRepository.save(userRole)
            })
        }
    }

    private async findRoleIds(id: number) {
        const list = await this.userRoleRepository.find({
            where: { userId: id }
        })
        return list.map(i => i.roleId)
    }

    public async getUserList(params: PaginationDto) {
        const users = await this.authUserRepository
            .createQueryBuilder('c')
            .where('c.name like :name')
            .setParameters({
                name: `%${params.keywords ? params.keywords : ''}%` // 用户名模糊查询
            })
            .orderBy('c.id', 'DESC')

            // .limit(params.pageSize)
            .skip((params.page - 1) * params.pageSize)
            .take(params.pageSize)
            .getManyAndCount()

        this.logger.log(users)

        return {
            code: HttpStatus.OK,
            data: users[0],
            total: users[1]
        }
    }

    public async deleteUser(id: string) {
        const { affected } = await this.authUserRepository.delete(id)
        if (affected <= 0) {
            return JsonData.fail(500 , 'fail')
        }
        return JsonData.success('success')
    }

    public async userDetail(id: number) {
        const user = await this.authUserRepository.findOne({ id })
        if (user) {
        return JsonData.success(user)
        }
        return JsonData.fail(500, 'Fail')
    }
}
