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
const class_validator_1 = require("class-validator");
const gender_enum_1 = require("../enum/gender.enum");
class CreateAuthUserDto {
}
__decorate([
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], CreateAuthUserDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateAuthUserDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsEnum(gender_enum_1.Gender),
    __metadata("design:type", String)
], CreateAuthUserDto.prototype, "gender", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateAuthUserDto.prototype, "name", void 0);
exports.CreateAuthUserDto = CreateAuthUserDto;
//# sourceMappingURL=createAuthUser.dto.js.map