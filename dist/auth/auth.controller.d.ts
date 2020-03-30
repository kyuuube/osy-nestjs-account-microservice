import { AuthService } from './auth.service';
import { CreateAuthUserDto } from './dto/createAuthUser.dto';
import { VerifyUserByEmailDto } from './dto/verifyUser.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class AuthController {
    private readonly authService;
    private logger;
    constructor(authService: AuthService);
    login(dto: VerifyUserByEmailDto): Promise<any>;
    signUp(createAuthUserDto: CreateAuthUserDto): Promise<import("../common/JsonData").ResponseData>;
    getUserList(dto: PaginationDto): Promise<{
        code: import("@nestjs/common").HttpStatus;
        data: import("./entity/auth.entity").AuthUser[];
        total: number;
    }>;
    deleteUser(id: string): Promise<import("../common/JsonData").ResponseData>;
    userDetail(id: number): Promise<import("../common/JsonData").ResponseData>;
}
