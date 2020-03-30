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
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const role_entity_1 = require("../role/role.entity");
let Permission = class Permission {
};
__decorate([
    typeorm_1.PrimaryColumn({
        length: 128,
        default: '',
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Permission.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        length: 128,
        default: '',
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Permission.prototype, "menuId", void 0);
__decorate([
    typeorm_1.Column({
        length: 128,
        default: '',
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Permission.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        length: 128,
        default: '',
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Permission.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({
        type: 'int',
        default: 0,
    }),
    __metadata("design:type", Number)
], Permission.prototype, "type", void 0);
__decorate([
    typeorm_1.Column({
        length: 128,
        default: '',
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Permission.prototype, "path", void 0);
__decorate([
    typeorm_1.Column({
        length: 128,
        default: '',
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Permission.prototype, "slug", void 0);
__decorate([
    typeorm_1.Column({
        length: 128,
        default: '',
    }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Permission.prototype, "methods", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: 'timestamp',
    }),
    __metadata("design:type", String)
], Permission.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({
        type: 'timestamp',
    }),
    __metadata("design:type", String)
], Permission.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.ManyToMany(type => role_entity_1.Role, role => role.permissions),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Permission.prototype, "roles", void 0);
Permission = __decorate([
    typeorm_1.Entity()
], Permission);
exports.Permission = Permission;
//# sourceMappingURL=permission.entity.js.map