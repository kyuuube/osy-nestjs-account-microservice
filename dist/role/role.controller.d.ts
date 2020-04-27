import { RoleService } from './role.service';
import { RoleDto } from './role.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class RoleController {
    private readonly roleService;
    private logger;
    constructor(roleService: RoleService);
    createRole(dto: RoleDto): Promise<{
        code: import("@nestjs/common").HttpStatus;
    }>;
    editRole(dto: RoleDto): Promise<{
        code: import("@nestjs/common").HttpStatus;
    }>;
    deleteRole(id: string): Promise<{
        code: import("@nestjs/common").HttpStatus;
    }>;
    roleDetail(id: string): Promise<{
        code: import("@nestjs/common").HttpStatus;
        data: import("./role.entity").Role;
    }>;
    getRoleList(dto: PaginationDto): Promise<{
        code: import("@nestjs/common").HttpStatus;
        data: import("./role.entity").Role[];
        total: number;
    }>;
    getRolePermissons(dto: any): Promise<{
        code: import("@nestjs/common").HttpStatus;
        data: any[];
    }>;
    getRoles(): Promise<{
        code: import("@nestjs/common").HttpStatus;
        data: import("./role.entity").Role[];
    }>;
}
