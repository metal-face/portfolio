import IORedis from "ioredis";

export const redisConnection: IORedis = new IORedis({
    host: process.env.KV_HOST,
    port: 6379,
    username: process.env.KV_USERNAME,
    password: process.env.KV_PASSWORD,
    maxRetriesPerRequest: null,
});
