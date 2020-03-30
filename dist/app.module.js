"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const dotenv = require("dotenv");
const path_1 = require("path");
const role_module_1 = require("./role/role.module");
const menu_module_1 = require("./menu/menu.module");
const permission_module_1 = require("./permission/permission.module");
dotenv.config();
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                database: 'account',
                entities: [path_1.join(__dirname, './**/*.entity{.ts,.js}')],
                host: process.env.DB_HOST,
                password: process.env.DB_ADMIN_PASSWORD,
                port: 3306,
                synchronize: true,
                type: 'mysql',
                username: process.env.DB_ADMIN_USERNAME,
            }),
            auth_module_1.AuthModule,
            role_module_1.RoleModule,
            menu_module_1.MenuModule,
            permission_module_1.PermissionModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map