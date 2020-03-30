import { Role } from '../role/role.entity';
export declare class Permission {
    id: string;
    menuId: string;
    name: string;
    description: string;
    type: number;
    path: string;
    slug: string;
    methods: string;
    createdAt: string;
    updatedAt: string;
    roles: Role[];
}
