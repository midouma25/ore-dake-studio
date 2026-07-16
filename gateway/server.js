const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose'); 
require('dotenv').config();
const path = require('path');

// 1. الاتصال بقاعدة البيانات
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/oredake_studio';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB successfully'))
  .catch((err) => console.error('❌ Error connecting to MongoDB:', err));

// 2. استدعاءات المسارات 
const authRoutes = require('./src/routes/authRoutes');
const aiJobsRouter = require('./src/routes/aiJobs');
const uploadRoutes = require('./src/routes/upload'); // تم التأكد من الاسم هنا

const { initWebSocket } = require('./src/services/websocket');
const { initWorker } = require('./src/workers/aiWorker');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { 
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST']
  }
});

// 3. إعدادات الـ Middleware
app.use(cors());
app.use(express.json());

// 4. مسار سري لاستقبال التقدم من بايثون وبثه للواجهة
app.post('/api/internal/progress', (req, res) => {
  const { message } = req.body;
  if (message) {
    io.emit('jobProgress', { message });
  }
  res.sendStatus(200);
});

// 5. ربط المسارات الأساسية (API Routes)
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiJobsRouter);
app.use('/api/upload', uploadRoutes); 

// 6. الملفات الثابتة (Static Files)
const outputsPath = path.resolve(__dirname, '../ai-engine/temp_workspace/demucs_out/mdx_extra/safe_input');
app.use('/outputs', express.static(outputsPath));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 7. تشغيل الخدمات
initWebSocket(io);
initWorker(); // Start processing the queue

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Gateway running on port ${PORT}`);
});