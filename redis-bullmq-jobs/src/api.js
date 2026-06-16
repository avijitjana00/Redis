import express from 'express';
import { emailQueue } from './queue.js';
import { Queue } from 'bullmq';


const PORT = process.env.PORT || 7000;
const app = express();
app.use(express.json());

app.post('/welcome-email', async (req, res) => {
    const job = emailQueue.add('send-welcome-email', {
        to: req.body.to,
        subject: 'Welcome to our service!', 
    },
    {
        attempts: 3, // Retry up to 3 times if the job fails
        backoff: {
            type: 'exponential',
            delay: 5000, // Wait 5 seconds before retrying
        },
    });
    res.status(200).json({ message: 'Welcome email job added to the queue', jobId: job.id });
});



app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});