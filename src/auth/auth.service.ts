import {
    HttpStatus,
    Injectable,
    Logger,
    UnauthorizedException
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
import { ResponseData } from '../common/JsonData'
import { RepositoryWarp } from '../common/decorators/repositoryWarp'

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
        const emailUser = await this.authUserRepository.findOne({
            email: createAuthUserDto.email
        })
        if (emailUser) {
            throw new RpcException({
                message:
                    'User with provided email or phone number already exists',
                code: HttpStatus.CONFLICT
            })
        }

        const publicUser = this.toPublicUser(
            await this.authUserRepository.save(
                Object.assign(new AuthUser(), createAuthUserDto)
            )
        )

        this.toSaveUserRoles(createAuthUserDto, publicUser.id)
        return publicUser
    }

    public async verifyAuthUserByEmail(dto: VerifyUserByEmailDto) {
        const auth = await this.authUserRepository.findOne({ email: dto.email })
        if (!auth) {
            throw new RpcException({
                message: 'User with provided email does not exist',
                code: HttpStatus.UNAUTHORIZED
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

    private async toUpdateUserRoles(user: CreateAuthUserDto, userId: string) {
        if (user?.roleIds) {
            await this.userRoleRepository
                .createQueryBuilder('c')
                .delete()
                .where('userId = :userId', { userId })
                .execute()

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

            .skip((params.page - 1) * params.pageSize)
            .take(params.pageSize)
            .getManyAndCount()

        return {
            data: users[0],
            total: users[1]
        }
    }

    @RepositoryWarp('delete')
    public async deleteUser(id: string) {
        return await this.authUserRepository.delete(id)
    }

    @RepositoryWarp('query')
    public async userDetail(id: number): Promise<any> {
        const roleIds = await this.findRoleIds(id)
        const user = await this.authUserRepository.findOne({ id })
        return this.toPublicUser(user, false, roleIds)
    }

    public async editUser(dto: CreateAuthUserDto) {
        // return  await this.authUserRepository.update(dto.id, dto)
        const getUserFromDB = await this.authUserRepository.findOne({
            id: dto.id
        })
        this.authUserRepository.merge(getUserFromDB, dto)

        const publicUser = this.toPublicUser(
            await this.authUserRepository.save(getUserFromDB)
        )

        await this.toUpdateUserRoles(dto, publicUser.id)
        return publicUser
    }
}
