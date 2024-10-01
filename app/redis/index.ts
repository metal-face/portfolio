import IORedis from "ioredis";

export const redisConnection: IORedis = new IORedis({
    host: "76.76.21.21",
    port: 6379,
    maxRetriesPerRequest: null,
});
