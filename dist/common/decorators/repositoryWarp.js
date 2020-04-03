"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
function RepositoryWarp() {
    const logger = new common_1.Logger('repositoryWarp');
    return (target, key, descriptor) => {
        logger.log({ target, key, descriptor });
        logger.log(JSON.stringify(descriptor));
        const value = descriptor.value;
        return descriptor;
    };
}
exports.RepositoryWarp = RepositoryWarp;
//# sourceMappingURL=repositoryWarp.js.map