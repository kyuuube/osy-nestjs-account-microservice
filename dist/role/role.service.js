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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const role_entity_1 = require("./role.entity");
const menu_entity_1 = require("../menu/menu.entity");
const permission_entity_1 = require("../permission/permission.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const snowflake_1 = require("../common/snowflake");
const user_role_entity_1 = require("../auth/entity/user.role.entity");
const lodash_1 = require("lodash");
let RoleService = class RoleService {
    constructor(roleRepository, menuRepository, permissionRepository, userRoleRepository) {
        this.roleRepository = roleRepository;
        this.menuRepository = menuRepository;
        this.permissionRepository = permissionRepository;
        this.userRoleRepository = userRoleRepository;
        this.logger = new common_1.Logger('RoleService');
    }
    createRole(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const snowflakeId = snowflake_1.default.generate();
            dto.id = snowflakeId;
            const role = Object.assign(new role_entity_1.Role(), dto);
            const menus = yield this.menuRepository.findByIds(dto.menuIdList);
            const permissions = yield this.permissionRepository.findByIds(dto.permissionIdList);
            role.menus = menus;
            role.permissions = permissions;
            yield this.roleRepository.save(role);
            return {
                code: common_1.HttpStatus.OK,
            };
        });
    }
    editRole(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = Object.assign(new role_entity_1.Role(), dto);
            const menus = yield this.menuRepository.findByIds(dto.menuIdList);
            const permissions = yield this.permissionRepository.findByIds(dto.permissionIdList);
            role.menus = menus;
            role.permissions = permissions;
            yield this.roleRepository.save(role);
            return {
                code: common_1.HttpStatus.OK,
            };
        });
    }
    deleteRole(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.roleRepository.delete(id);
            return {
                code: common_1.HttpStatus.OK,
            };
        });
    }
    roleDetail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield this.roleRepository
                .createQueryBuilder('r')
                .leftJoinAndSelect('r.menus', 'menus')
                .leftJoinAndSelect('r.permissions', 'permissions')
                .where('r.id = :id', { id })
                .getOne();
            return {
                code: common_1.HttpStatus.OK,
                role,
            };
        });
    }
    roleList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const roles = yield this.roleRepository
                .createQueryBuilder('c')
                .where('c.name like :name')
                .setParameters({
                name: `%${params.keywords ? params.keywords : ''}%`,
            })
                .orderBy('c.id', 'DESC')
                .skip(params.page)
                .take(params.pageSize)
                .getManyAndCount();
            return {
                code: common_1.HttpStatus.OK,
                data: roles[0],
                total: roles[1],
            };
        });
    }
    getRolesPermissions(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const roleList = yield this.userRoleRepository.find({
                where: { userId: data.user.id },
            });
            this.logger.log(roleList);
            const permissions = yield this.roleRepository
                .createQueryBuilder('r')
                .leftJoinAndSelect('r.permissions', 'mepermissionsnu')
                .getMany();
            this.logger.log(permissions);
            const list = permissions.filter(i => roleList.some(r => r.roleId === i.id));
            this.logger.log(list);
            let tempList = [];
            list.forEach(i => {
                tempList = [...tempList, ...i.permissions];
            });
            tempList = lodash_1.uniqBy(tempList, 'id');
            return {
                code: common_1.HttpStatus.OK,
                data: tempList
            };
        });
    }
};
RoleService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(role_entity_1.Role)),
    __param(1, typeorm_2.InjectRepository(menu_entity_1.Menu)),
    __param(2, typeorm_2.InjectRepository(permission_entity_1.Permission)),
    __param(3, typeorm_2.InjectRepository(user_role_entity_1.UserRole)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map