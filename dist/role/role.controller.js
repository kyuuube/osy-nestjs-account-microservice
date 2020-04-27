"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const role_service_1 = require("./role.service");
const microservices_1 = require("@nestjs/microservices");
const account_validation_pipe_1 = require("../common/validation/account.validation.pipe");
const role_dto_1 = require("./role.dto");
const pagination_dto_1 = require("../common/dto/pagination.dto");
let RoleController = class RoleController {
    constructor(roleService) {
        this.roleService = roleService;
        this.logger = new common_1.Logger('Account service');
    }
    createRole(dto) {
        return this.roleService.createRole(dto);
    }
    editRole(dto) {
        return this.roleService.editRole(dto);
    }
    deleteRole(id) {
        return this.roleService.deleteRole(id);
    }
    roleDetail(id) {
        return this.roleService.roleDetail(id);
    }
    getRoleList(dto) {
        return this.roleService.roleList(dto);
    }
    getRolePermissons(dto) {
        return this.roleService.getRolesPermissions(dto);
    }
    getRoles() {
        return this.roleService.roleAllList();
    }
};
__decorate([
    common_1.UsePipes(new account_validation_pipe_1.ValidationPipe()),
    microservices_1.MessagePattern({ cmd: 'create role' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.RoleDto]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "createRole", null);
__decorate([
    common_1.UsePipes(new account_validation_pipe_1.ValidationPipe()),
    microservices_1.MessagePattern({ cmd: 'edit role' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.RoleDto]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "editRole", null);
__decorate([
    microservices_1.MessagePattern({ cmd: 'del role' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "deleteRole", null);
__decorate([
    microservices_1.MessagePattern({ cmd: 'role detail' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "roleDetail", null);
__decorate([
    microservices_1.MessagePattern({ cmd: 'role list' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "getRoleList", null);
__decorate([
    microservices_1.MessagePattern({ cmd: 'role permissions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "getRolePermissons", null);
__decorate([
    microservices_1.MessagePattern({ cmd: 'all role' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "getRoles", null);
RoleController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleController);
exports.RoleController = RoleController;
//# sourceMappingURL=role.controller.js.map