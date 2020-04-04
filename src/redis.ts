import redisStore = require('cache-manager/examples/redis_example/redis_store')
import CacheManager = require('cache-manager')
export const cacheManager = CacheManager.caching({
    store: redisStore,
    db: 0,
    ttl: 100
})
