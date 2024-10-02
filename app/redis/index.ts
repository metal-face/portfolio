import IORedis from "ioredis";

const REDIS_HOST: string | undefined = process.env.REDIS_HOST as string;
let REDIS_PORT: string | number | undefined = process.env.REDIS_PORT;
const REDIS_USERNAME: string | undefined = process.env.REDIS_USERNAME as string;
const REDIS_PASSWORD: string | undefined = process.env.REDIS_PASSWORD as string;

if (!REDIS_HOST || !REDIS_PORT || !REDIS_USERNAME || !REDIS_PASSWORD) {
    throw new Error("Missing environment variable");
}

REDIS_PORT = parseInt(REDIS_PORT);

export const redisConnection: IORedis = new IORedis({
    host: REDIS_HOST,
    port: REDIS_PORT,
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD,
    maxRetriesPerRequest: null,
});

redisConnection.on("connecting", () => {
    console.log("REDIS CONNECTING ⌛️");
});

redisConnection.on("connect", () => {
    console.log("REDIS CONNECTED ✅");
});

redisConnection.on("ready", () => {
    console.log("REDIS CONNECTION READY");
});
