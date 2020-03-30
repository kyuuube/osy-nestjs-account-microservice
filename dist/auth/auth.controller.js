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
const auth_service_1 = require("./auth.service");
const microservices_1 = require("@nestjs/microservices");
const createAuthUser_dto_1 = require("./dto/createAuthUser.dto");
const verifyUser_dto_1 = require("./dto/verifyUser.dto");
const account_validation_pipe_1 = require("../common/validation/account.validation.pipe");
const pagination_dto_1 = require("../common/dto/pagination.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.logger = new common_1.Logger('Account service');
    }
    login(dto) {
        return this.authService.verifyAuthUserByEmail(dto);
    }
    signUp(createAuthUserDto) {
        this.logger.log(createAuthUserDto);
        return this.authService.createUser(createAuthUserDto);
    }
    getUserList(dto) {
        return this.authService.getUserList(dto);
    }
    deleteUser(id) {
        return this.authService.deleteUser(id);
    }
};
__decorate([
    common_1.UsePipes(new account_validation_pipe_1.ValidationPipe()),
    microservices_1.MessagePattern({ cmd: 'validateUser' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verifyUser_dto_1.VerifyUserByEmailDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    common_1.UsePipes(new account_validation_pipe_1.ValidationPipe()),
    microservices_1.MessagePattern({ cmd: 'signUp' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createAuthUser_dto_1.CreateAuthUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signUp", null);
__decorate([
    microservices_1.MessagePattern({ cmd: 'user list' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getUserList", null);
__decorate([
    microservices_1.MessagePattern({ cmd: 'del user' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "deleteUser", null);
AuthController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map