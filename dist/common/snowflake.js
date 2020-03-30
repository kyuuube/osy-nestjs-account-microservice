"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const snowflake_id_1 = require("snowflake-id");
const snowflake = new snowflake_id_1.default({
    mid: 42,
    offset: (2019 - 1970) * 31536000 * 1000,
});
exports.default = snowflake;
//# sourceMappingURL=snowflake.js.map