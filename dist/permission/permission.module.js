"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const permission_controller_1 = require("./permission.controller");
const permission_service_1 = require("./permission.service");
const typeorm_1 = require("@nestjs/typeorm");
const permission_entity_1 = require("./permission.entity");
let PermissionModule = class PermissionModule {
};
PermissionModule = __decorate([
    common_1.Module({
        controllers: [permission_controller_1.PermissionController],
        imports: [typeorm_1.TypeOrmModule.forFeature([permission_entity_1.Permission])],
        providers: [permission_service_1.PermissionService]
    })
], PermissionModule);
exports.PermissionModule = PermissionModule;
//# sourceMappingURL=permission.module.js.map