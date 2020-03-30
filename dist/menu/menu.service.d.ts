import { HttpStatus } from '@nestjs/common';
import { Menu } from './menu.entity';
import { UserRole } from '../auth/entity/user.role.entity';
import { Role } from '../role/role.entity';
import { Repository, TreeRepository } from 'typeorm';
import { MenuDto } from './menu.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class MenuService {
    private readonly menuRepository;
    private readonly treeRepository;
    private readonly userRoleRepository;
    private readonly roleRepository;
    constructor(menuRepository: Repository<Menu>, treeRepository: TreeRepository<Menu>, userRoleRepository: Repository<UserRole>, roleRepository: Repository<Role>);
    private logger;
    createMenu(dto: MenuDto): Promise<{
        code: HttpStatus;
    }>;
    editMenu(dto: MenuDto): Promise<{
        code: HttpStatus;
    }>;
    deleteMenu(id: string): Promise<{
        code: HttpStatus;
    }>;
    menuDetail(id: string): Promise<{
        code: HttpStatus;
        role: Menu;
    }>;
    menuList(params: PaginationDto): Promise<{
        code: HttpStatus;
        data: Menu[];
        total: number;
    }>;
    menuTree(): Promise<{
        data: Menu[];
        code: HttpStatus;
    }>;
    getMenu(user: any): Promise<{
        tree: any;
        code: HttpStatus;
    }>;
}