import { Menu } from '../menu/menu.entity';
import { Permission } from '../permission/permission.entity';
export declare class Role {
    id: string;
    name: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    menus: Menu[];
    permissions: Permission[];
}
