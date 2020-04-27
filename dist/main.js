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
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const exceptionFilter_1 = require("./common/filters/exceptionFilter");
const logger = new common_1.Logger('Account service');
const microserviceOptions = {
    transport: microservices_1.Transport.TCP,
    options: {
        host: '127.0.0.1',
        port: 8877
    }
};
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.createMicroservice(app_module_1.AppModule, microserviceOptions);
        app.useGlobalFilters(new exceptionFilter_1.ExceptionFilter());
        app.listen(() => {
            logger.log('account microservice is listening');
        });
    });
}
bootstrap();
//# sourceMappingURL=main.js.map