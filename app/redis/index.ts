import IORedis from "ioredis";

export const redisConnection: IORedis = new IORedis({
    host: "localhost",
    port: 6379,
    maxRetriesPerRequest: null,
});