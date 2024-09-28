import { Job, Queue, Worker } from "bullmq";
import { sendConfirmationMail } from "~/mail";
import { redisConnection } from "~/redis";

export const emailQueue: Queue = new Queue("emailQueue", {
    connection: redisConnection,
});

const emailWorker: Worker = new Worker(
    "emailQueue",
    async (job: Job) => {
        const { to, firstName, scheduleDate, scheduleTime } = job.data;
        return await sendConfirmationMail(to, firstName, scheduleDate, scheduleTime);
    },
    { connection: redisConnection },
);

emailWorker.on("active", (job: Job) => {
    console.log(`Job ${job.id} is now active!`);
});

emailWorker.on("stalled", (jobId: string, prev: string) => {
    console.log(`Email worker ${jobId} has stalled`);
});

emailWorker.on("completed", (job: Job) => {
    console.log(`Email Job ${job.id} completed successfully ✅`);
});

emailWorker.on("failed", async (job: Job | undefined, err: Error) => {
    console.error(`Email Job ${job?.id} Failed ❌==> ${err.message}`);
});
