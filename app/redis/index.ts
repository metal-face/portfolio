import IORedis from "ioredis";

export const redisConnection: IORedis = new IORedis({
    maxRetriesPerRequest: null,
});
