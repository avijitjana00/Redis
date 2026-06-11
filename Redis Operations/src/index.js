import express from "express";
import Redis from "ioredis";

const app = express();

const PORT = process.env.PORT || 7000;
app.use(express.json());

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

const BANNER_KEY = "app:banner";

app.get("/", (req, res)=>{
    res.json("Redis operations server is running...")
})

app.post("/banner", async(req, res)=>{
    await redis.set(BANNER_KEY, req?.body?.message || "welcome to redis learn");
    res.json({success: true});
})

app.get("/banner", async(req, res)=>{
    const message = await redis.get(BANNER_KEY);
    res.json({message});
})

app.delete("/banner", async(req, res)=>{
    await redis.del(BANNER_KEY);
    res.json({success: true})
})

app.get("/banner/exists", async(req, res)=>{
    const exists = await redis.exists(BANNER_KEY);
    res.json({exists: Boolean(exists)});
})

app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})