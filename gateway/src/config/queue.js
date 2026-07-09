const { Queue, QueueEvents } = require('bullmq');

const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
};

// Create the main AI processing queue
const aiQueue = new Queue('ai-processing', { 
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  }
});

// Setup events to listen for progress and completion globally
const queueEvents = new QueueEvents('ai-processing', { connection });

module.exports = {
  aiQueue,
  queueEvents,
  connection
};