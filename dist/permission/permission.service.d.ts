import { HttpStatus } from '@nestjs/common';
import { Permission } from './permission.entity';
import { Repository } from 'typeorm';
import { PermissionDto } from './permisssion.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class PermissionService {
    private readonly permRepository;
    constructor(permRepository: Repository<Permission>);
    private logger;
    createPerm(dto: PermissionDto): Promise<{
        code: HttpStatus;
    }>;
    deletePerm(id: string): Promise<{
        code: HttpStatus;
    }>;
    editPerm(dto: PermissionDto): Promise<{
        code: HttpStatus;
    }>;
    permDetail(id: string): Promise<{
        code: HttpStatus;
        role: Permission;
    }>;
    permList(params: PaginationDto): Promise<{
        code: HttpStatus;
        data: Permission[];
        total: number;
    }>;
}
