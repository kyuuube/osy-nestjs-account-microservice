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
const menu_service_1 = require("./menu.service");
const microservices_1 = require("@nestjs/microservices");
const account_validation_pipe_1 = require("../common/validation/account.validation.pipe");
const menu_dto_1 = require("./menu.dto");
const pagination_dto_1 = require("../common/dto/pagination.dto");
let MenuController = class MenuController {
    constructor(menuService) {
        this.menuService = menuService;
        this.logger = new common_1.Logger('Account service');
    }
    createMenu(dto) {
        return this.menuService.createMenu(dto);
    }
    editMenu(dto) {
        return this.menuService.editMenu(dto);
    }
    deleteMenu(id) {
        return this.menuService.deleteMenu(id);
    }
    menuDetail(id) {
        return this.menuService.menuDetail(id);
    }
    getMenuList(dto) {
        return this.menuService.menuList(dto);
    }
    getMenuTree() {
        return this.menuService.menuTree();
    }
    getMenu(user) {
        return this.menuService.getMenu(user);
    }
};
__decorate([
    common_1.UsePipes(new account_validation_pipe_1.ValidationPipe()),
    microservices_1.MessagePattern({ cmd: 'create menu' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [menu_dto_1.MenuDto]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "createMenu", null);
__decorate([
    common_1.UsePipes(new account_validation_pipe_1.ValidationPipe()),
    microservices_1.MessagePattern({ cmd: 'edit menu' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [menu_dto_1.MenuDto]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "editMenu", null);
__decorate([
    microservices_1.MessagePattern({ cmd: 'del menu' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "deleteMenu", null);
__decorate([
    microservices_1.MessagePattern({ cmd: 'menu detail' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "menuDetail", null);
__decorate([
    microservices_1.MessagePattern({ cmd: 'menu list' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "getMenuList", null);
__decorate([
    microservices_1.MessagePattern({ cmd: 'menu tree' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "getMenuTree", null);
__decorate([
    microservices_1.MessagePattern({ cmd: 'menu' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "getMenu", null);
MenuController = __decorate([
    common_1.Controller('menu'),
    __metadata("design:paramtypes", [menu_service_1.MenuService])
], MenuController);
exports.MenuController = MenuController;
//# sourceMappingURL=menu.controller.js.map