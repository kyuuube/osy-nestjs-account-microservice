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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const auth_entity_1 = require("./entity/auth.entity");
const user_role_entity_1 = require("./entity/user.role.entity");
const microservices_1 = require("@nestjs/microservices");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const crypto = require("crypto");
const redis_1 = require("../redis");
const JsonData_1 = require("../common/JsonData");
let AuthService = class AuthService {
    constructor(authUserRepository, userRoleRepository) {
        this.authUserRepository = authUserRepository;
        this.userRoleRepository = userRoleRepository;
        this.logger = new common_1.Logger('AuthService');
    }
    createUser(createAuthUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(createAuthUserDto);
            const emailUser = yield this.authUserRepository.findOne({
                email: createAuthUserDto.email
            });
            if (emailUser) {
                throw new microservices_1.RpcException({
                    message: 'User with provided email or phone number already exists',
                    status: common_1.HttpStatus.CONFLICT
                });
            }
            const publicUser = this.toPublicUser(yield this.authUserRepository.save(Object.assign(new auth_entity_1.AuthUser(), createAuthUserDto)));
            this.toSaveUserRoles(createAuthUserDto, publicUser.id);
            return JsonData_1.JsonData.success(publicUser);
        });
    }
    verifyAuthUserByEmail(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const auth = yield this.authUserRepository.findOne({ email: dto.email });
            if (!auth) {
                throw new microservices_1.RpcException({
                    message: 'User with provided email does not exist',
                    statusCode: common_1.HttpStatus.UNAUTHORIZED
                });
            }
            const passHash = crypto
                .createHmac('sha256', auth.passwordSalt)
                .update(dto.password)
                .digest('hex');
            if (auth.password === passHash) {
                const roleIds = yield this.findRoleIds(auth.id);
                return this.toPublicUser(auth, true, roleIds);
            }
            else {
                throw new microservices_1.RpcException(new common_1.UnauthorizedException('Password is incorrect'));
            }
        });
    }
    toPublicUser(auth, caching = false, roleIds) {
        const { password, passwordSalt } = auth, publicUser = __rest(auth, ["password", "passwordSalt"]);
        if (caching) {
            redis_1.cacheManager.set(publicUser.id, Object.assign(Object.assign({}, publicUser), { roleIds }), { ttl: 1000 }, (err, result) => {
                this.logger.log({ result, err });
            });
        }
        return Object.assign(Object.assign({}, publicUser), { roleIds });
    }
    toSaveUserRoles(user, userId) {
        if (user === null || user === void 0 ? void 0 : user.roleIds) {
            const ids = user.roleIds;
            ids.forEach(id => {
                const userRole = this.userRoleRepository.create({
                    userId,
                    roleId: id
                });
                this.userRoleRepository.save(userRole);
            });
        }
    }
    findRoleIds(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield this.userRoleRepository.find({
                where: { userId: id }
            });
            return list.map(i => i.roleId);
        });
    }
    getUserList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.authUserRepository
                .createQueryBuilder('c')
                .where('c.name like :name')
                .setParameters({
                name: `%${params.keywords ? params.keywords : ''}%`
            })
                .orderBy('c.id', 'DESC')
                .skip((params.page - 1) * params.pageSize)
                .take(params.pageSize)
                .getManyAndCount();
            this.logger.log(users);
            return {
                code: common_1.HttpStatus.OK,
                data: users[0],
                total: users[1]
            };
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { affected } = yield this.authUserRepository.delete(id);
            if (affected <= 0) {
                return JsonData_1.JsonData.fail(500, 'fail');
            }
            return JsonData_1.JsonData.success('success');
        });
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(auth_entity_1.AuthUser)),
    __param(1, typeorm_2.InjectRepository(user_role_entity_1.UserRole)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map