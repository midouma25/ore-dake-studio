const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

// Imports
const aiJobsRouter = require('./src/routes/aiJobs');
const { initWebSocket } = require('./src/services/websocket');
const { initWorker } = require('./src/workers/aiWorker');
const uploadRouter = require('./src/routes/upload'); // أضف هذا في الأعلى
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: process.env.FRONTEND_URL || 'http://localhost:3000' }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/ai', aiJobsRouter);

// ...
app.use('/api/upload', uploadRouter); // أضف هذا مع مسارات الـ API
app.use('/uploads', express.static('../uploads'));


// Init Services
initWebSocket(io);
initWorker(); // Start processing the queue

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Gateway running on port ${PORT}`);
});