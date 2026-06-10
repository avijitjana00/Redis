import express from "express";
import Redis from "ioredis";
import mongoose, { mongo } from "mongoose";


const app = express();

const PORT = process.env.PORT || 7000;

const redis = new Redis(process.env.REDIS_PORT || "redis://localhost:6379");

app.get("/", (req, res)=>{
    res.send("Backend appling is running...")
})

app.get("/redis", async(req, res)=>{
    const reply = await redis.ping();
    res.json({ redis: reply});
})

app.get("/mongo", async(req, res)=>{
    const url = process.env.MONGO_URL || "mongodb://localhost:27017/redis_db";
     if(mongoose.connection.readyState === 0){
        await mongoose.connect(url);
     }
     res.json({ mongo: "connected", database: mongoose.connection.name})
})

app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`);
})