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
const permission_service_1 = require("./permission.service");
const microservices_1 = require("@nestjs/microservices");
const account_validation_pipe_1 = require("../common/validation/account.validation.pipe");
const permisssion_dto_1 = require("./permisssion.dto");
const pagination_dto_1 = require("../common/dto/pagination.dto");
let PermissionController = class PermissionController {
    constructor(permissionService) {
        this.permissionService = permissionService;
        this.logger = new common_1.Logger('Account service');
    }
    createMenu(dto) {
        return this.permissionService.createPerm(dto);
    }
    editMenu(dto) {
        return this.permissionService.createPerm(dto);
    }
    deleteRole(id) {
        return this.permissionService.deletePerm(id);
    }
    roleDetail(id) {
        return this.permissionService.permDetail(id);
    }
    getRoleList(dto) {
        return this.permissionService.permList(dto);
    }
};
__decorate([
    common_1.UsePipes(new account_validation_pipe_1.ValidationPipe()),
    microservices_1.MessagePattern({ cmd: 'create perm' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [permisssion_dto_1.PermissionDto]),
    __metadata("design:returntype", void 0)
], PermissionController.prototype, "createMenu", null);
__decorate([
    common_1.UsePipes(new account_validation_pipe_1.ValidationPipe()),
    microservices_1.MessagePattern({ cmd: 'edit perm' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [permisssion_dto_1.PermissionDto]),
    __metadata("design:returntype", void 0)
], PermissionController.prototype, "editMenu", null);
__decorate([
    microservices_1.MessagePattern({ cmd: 'del perm' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PermissionController.prototype, "deleteRole", null);
__decorate([
    microservices_1.MessagePattern({ cmd: 'perm detail' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PermissionController.prototype, "roleDetail", null);
__decorate([
    microservices_1.MessagePattern({ cmd: 'perm list' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], PermissionController.prototype, "getRoleList", null);
PermissionController = __decorate([
    common_1.Controller('permission'),
    __metadata("design:paramtypes", [permission_service_1.PermissionService])
], PermissionController);
exports.PermissionController = PermissionController;
//# sourceMappingURL=permission.controller.js.map