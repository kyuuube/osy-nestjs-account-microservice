"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const menu_controller_1 = require("./menu.controller");
const menu_service_1 = require("./menu.service");
const menu_entity_1 = require("./menu.entity");
const user_role_entity_1 = require("../auth/entity/user.role.entity");
const role_entity_1 = require("../role/role.entity");
const permission_entity_1 = require("../permission/permission.entity");
let MenuModule = class MenuModule {
};
MenuModule = __decorate([
    common_1.Module({
        controllers: [menu_controller_1.MenuController],
        imports: [typeorm_1.TypeOrmModule.forFeature([menu_entity_1.Menu, user_role_entity_1.UserRole, role_entity_1.Role, permission_entity_1.Permission])],
        providers: [menu_service_1.MenuService]
    })
], MenuModule);
exports.MenuModule = MenuModule;
//# sourceMappingURL=menu.module.js.map