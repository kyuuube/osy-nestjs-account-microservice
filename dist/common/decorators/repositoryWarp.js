"use strict";
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
const microservices_1 = require("@nestjs/microservices");
function RepositoryWarp(options = 'query') {
    const logger = new common_1.Logger('repositoryWarp');
    return (target, key, descriptor) => {
        const method = descriptor.value;
        descriptor.value = function (...args) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield method.apply(this, args);
                if (!result && options === 'query') {
                    throw new microservices_1.RpcException({ code: 500, message: '获取失败' });
                }
                if (result.affected <= 0 && options === 'delete') {
                    throw new microservices_1.RpcException({ code: 500, message: '删除失败' });
                }
                return {
                    data: result
                };
            });
        };
        return descriptor;
    };
}
exports.RepositoryWarp = RepositoryWarp;
//# sourceMappingURL=repositoryWarp.js.map