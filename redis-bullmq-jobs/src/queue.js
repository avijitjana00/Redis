import { Queue } from "bullmq"

export const connection = {
    host: "localhost",
    port: 6379
}

//takes two thing=> 1. queue name and 2. redis connection
export const emailQueue = new Queue("emails", { connection })