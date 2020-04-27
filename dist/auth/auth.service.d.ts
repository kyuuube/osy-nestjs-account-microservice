import { CreateAuthUserDto } from './dto/createAuthUser.dto';
import { VerifyUserByEmailDto } from './dto/verifyUser.dto';
import { AuthUser } from './entity/auth.entity';
import { UserRole } from './entity/user.role.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ResponseData } from '../common/JsonData';
export declare class AuthService {
    private readonly authUserRepository;
    private readonly userRoleRepository;
    constructor(authUserRepository: Repository<AuthUser>, userRoleRepository: Repository<UserRole>);
    private logger;
    createUser(createAuthUserDto: CreateAuthUserDto): Promise<ResponseData>;
    verifyAuthUserByEmail(dto: VerifyUserByEmailDto): Promise<any>;
    private toPublicUser;
    private toSaveUserRoles;
    private toUpdateUserRoles;
    private findRoleIds;
    getUserList(params: PaginationDto): Promise<{
        data: AuthUser[];
        total: number;
    }>;
    deleteUser(id: string): Promise<import("typeorm").DeleteResult>;
    userDetail(id: number): Promise<any>;
    editUser(dto: CreateAuthUserDto): Promise<any>;
}
