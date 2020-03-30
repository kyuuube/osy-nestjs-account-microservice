"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redisStore = require("cache-manager/examples/redis_example/redis_store");
const CacheManager = require("cache-manager");
exports.cacheManager = CacheManager.caching({
    store: redisStore,
    db: 0,
    ttl: 100,
});
//# sourceMappingURL=redis.js.map