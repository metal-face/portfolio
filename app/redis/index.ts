import IORedis from "ioredis";

export const redisConnection: IORedis = new IORedis({
    host: "bryan-hughes.com",
    port: 6379,
    maxRetriesPerRequest: null,
});
