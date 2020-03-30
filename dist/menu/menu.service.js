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
const menu_entity_1 = require("./menu.entity");
const user_role_entity_1 = require("../auth/entity/user.role.entity");
const role_entity_1 = require("../role/role.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const snowflake_1 = require("../common/snowflake");
const lodash_1 = require("lodash");
const buildTree_1 = require("../common/uitls/buildTree");
let MenuService = class MenuService {
    constructor(menuRepository, treeRepository, userRoleRepository, roleRepository) {
        this.menuRepository = menuRepository;
        this.treeRepository = treeRepository;
        this.userRoleRepository = userRoleRepository;
        this.roleRepository = roleRepository;
        this.logger = new common_1.Logger('MenuService');
    }
    createMenu(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const snowflakeId = snowflake_1.default.generate();
            dto.id = snowflakeId;
            let newMenu = Object.assign(new menu_entity_1.Menu(), dto);
            if ((dto === null || dto === void 0 ? void 0 : dto.parentId) && dto.parentId) {
                const parentDto = yield this.menuRepository.findOne(dto.parentId);
                const parent = Object.assign(new menu_entity_1.Menu(), parentDto);
                newMenu = Object.assign(new menu_entity_1.Menu(), dto);
                newMenu.parent = parent;
            }
            yield this.menuRepository.save(Object.assign(new menu_entity_1.Menu(), newMenu));
            return {
                code: common_1.HttpStatus.OK,
            };
        });
    }
    editMenu(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.menuRepository.update(dto.id, dto);
            return {
                code: common_1.HttpStatus.OK,
            };
        });
    }
    deleteMenu(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.menuRepository.delete(id);
            return {
                code: common_1.HttpStatus.OK,
            };
        });
    }
    menuDetail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield this.menuRepository.findOne({ id });
            console.log(role);
            return {
                code: common_1.HttpStatus.OK,
                role,
            };
        });
    }
    menuList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const menus = yield this.menuRepository
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
                data: menus[0],
                total: menus[1],
            };
        });
    }
    menuTree() {
        return __awaiter(this, void 0, void 0, function* () {
            const tree = yield this.treeRepository.findTrees();
            return {
                data: tree,
                code: common_1.HttpStatus.OK,
            };
        });
    }
    getMenu(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const roleList = yield this.userRoleRepository.find({
                where: { userId: user.id },
            });
            const menuList = yield this.roleRepository
                .createQueryBuilder('r')
                .leftJoinAndSelect('r.menus', 'menu')
                .getMany();
            const list = menuList.filter(i => roleList.some(r => r.roleId === i.id));
            let tempList = [];
            list.forEach(i => {
                tempList = [...tempList, ...i.menus];
            });
            tempList = lodash_1.uniqBy(tempList, 'id');
            const tree = buildTree_1.buildTreeList(tempList);
            return {
                tree,
                code: common_1.HttpStatus.OK,
            };
        });
    }
};
MenuService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(menu_entity_1.Menu)),
    __param(1, typeorm_2.InjectRepository(menu_entity_1.Menu)),
    __param(2, typeorm_2.InjectRepository(user_role_entity_1.UserRole)),
    __param(3, typeorm_2.InjectRepository(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.TreeRepository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], MenuService);
exports.MenuService = MenuService;
//# sourceMappingURL=menu.service.js.map