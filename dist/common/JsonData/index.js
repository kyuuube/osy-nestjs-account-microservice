"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JsonData {
    static success(data) {
        const result = {
            code: 200,
            msg: 'success',
            data,
            time: new Date().toLocaleString()
        };
        return result;
    }
    static fail(code, msg) {
        const result = {
            code: 500,
            msg,
            data: undefined,
            time: new Date().toLocaleString()
        };
        return result;
    }
}
exports.JsonData = JsonData;
//# sourceMappingURL=index.js.map