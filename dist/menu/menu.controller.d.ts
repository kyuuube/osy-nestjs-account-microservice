import { MenuService } from './menu.service';
import { MenuDto } from './menu.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
export declare class MenuController {
    private readonly menuService;
    private logger;
    constructor(menuService: MenuService);
    createMenu(dto: MenuDto): Promise<{
        code: import("@nestjs/common").HttpStatus;
    }>;
    editMenu(dto: MenuDto): Promise<{
        code: import("@nestjs/common").HttpStatus;
    }>;
    deleteMenu(id: string): Promise<{
        code: import("@nestjs/common").HttpStatus;
    }>;
    menuDetail(id: string): Promise<{
        code: import("@nestjs/common").HttpStatus;
        role: import("./menu.entity").Menu;
    }>;
    getMenuList(dto: PaginationDto): Promise<{
        code: import("@nestjs/common").HttpStatus;
        data: import("./menu.entity").Menu[];
        total: number;
    }>;
    getMenuTree(): Promise<{
        data: import("./menu.entity").Menu[];
        code: import("@nestjs/common").HttpStatus;
    }>;
    getMenu(user: any): Promise<{
        tree: any;
        code: import("@nestjs/common").HttpStatus;
    }>;
}
