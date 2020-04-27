import { HttpStatus } from '@nestjs/common';
import { Role } from './role.entity';
import { Menu } from '../menu/menu.entity';
import { Permission } from '../permission/permission.entity';
import { Repository } from 'typeorm';
import { RoleDto } from './role.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { UserRole } from '../auth/entity/user.role.entity';
export declare class RoleService {
    private readonly roleRepository;
    private readonly menuRepository;
    private readonly permissionRepository;
    private readonly userRoleRepository;
    constructor(roleRepository: Repository<Role>, menuRepository: Repository<Menu>, permissionRepository: Repository<Permission>, userRoleRepository: Repository<UserRole>);
    private logger;
    createRole(dto: RoleDto): Promise<{
        code: HttpStatus;
    }>;
    editRole(dto: RoleDto): Promise<{
        code: HttpStatus;
    }>;
    deleteRole(id: string): Promise<{
        code: HttpStatus;
    }>;
    roleDetail(id: string): Promise<{
        code: HttpStatus;
        data: Role;
    }>;
    roleList(params: PaginationDto): Promise<{
        code: HttpStatus;
        data: Role[];
        total: number;
    }>;
    roleAllList(): Promise<{
        code: HttpStatus;
        data: Role[];
    }>;
    getRolesPermissions(data: any): Promise<{
        code: HttpStatus;
        data: any[];
    }>;
}
