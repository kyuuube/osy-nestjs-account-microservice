import { Role } from '../role/role.entity';
export declare class Menu {
    id: string;
    name: string;
    description: string;
    url: string;
    icon: string;
    children: Menu[];
    parentId: string;
    parent: Menu;
    createdAt: Date;
    updatedAt: Date;
    roles: Role[];
}
