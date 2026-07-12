const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config();
const path = require('path');

const outputsPath = path.resolve(__dirname, '../ai-engine/temp_workspace/demucs_out/mdx_extra/safe_input');
const aiJobsRouter = require('./src/routes/aiJobs');
const { initWebSocket } = require('./src/services/websocket');
const { initWorker } = require('./src/workers/aiWorker');
const uploadRouter = require('./src/routes/upload'); 
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { 
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// 🌟 مسار سري لاستقبال التقدم من بايثون وبثه للواجهة 🌟
app.post('/api/internal/progress', (req, res) => {
  const { message } = req.body;
  if (message) {
    io.emit('jobProgress', { message });
  }
  res.sendStatus(200);
});

// Routes
app.use('/api/ai', aiJobsRouter);

// توزيع الملفات المضغوطة للمتصفح
app.use('/outputs', express.static(outputsPath));
app.use('/api/upload', uploadRouter); 
app.use('/uploads', express.static('../uploads'));
console.log("Serving static files from:", outputsPath);

// Init Services
initWebSocket(io);
initWorker(); // Start processing the queue

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Gateway running on port ${PORT}`);
});