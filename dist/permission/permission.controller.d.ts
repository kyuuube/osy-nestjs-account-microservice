import { PermissionService } from './permission.service';
import { PermissionDto } from './permisssion.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class PermissionController {
    private readonly permissionService;
    private logger;
    constructor(permissionService: PermissionService);
    createMenu(dto: PermissionDto): Promise<{
        code: import("@nestjs/common").HttpStatus;
    }>;
    editMenu(dto: PermissionDto): Promise<{
        code: import("@nestjs/common").HttpStatus;
    }>;
    deleteRole(id: string): Promise<{
        code: import("@nestjs/common").HttpStatus;
    }>;
    roleDetail(id: string): Promise<{
        code: import("@nestjs/common").HttpStatus;
        role: import("./permission.entity").Permission;
    }>;
    getRoleList(dto: PaginationDto): Promise<{
        code: import("@nestjs/common").HttpStatus;
        data: import("./permission.entity").Permission[];
        total: number;
    }>;
}
