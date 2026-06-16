import { Worker } from "bullmq";
import { connection } from "./queue.js";


//takes three thing =? 1. name 2. funciton 3. redis connection
const worker = new Worker(
    "emails",
    async (job)=>{
        console.log("Processing email job...", job.id, job.name, job.data);
        (await new Promise ((resolve)=> setTimeout(resolve, 1500)),
            console.log("Email job completed!", job.id, job.name, job.data));
    },
    { connection }
)


//handle worker event
worker.on("completed", (job)=>{
    console.log("Job completed", job.id, job.name, job.data);
})

worker.on("failed", (job, err)=>{
    console.log("Job failed", job.id, job.name, job.data, err);
})