let io;

const initWebSocket = (socketIoInstance) => {
  io = socketIoInstance;

  io.on('connection', (socket) => {
    console.log(`[WS] Client connected: ${socket.id}`);

    // Client subscribes to a specific job to get its progress
    socket.on('subscribe:job', (jobId) => {
      const roomName = `job:${jobId}`;
      socket.join(roomName);
      console.log(`[WS] Socket ${socket.id} joined room ${roomName}`);
    });

    socket.on('unsubscribe:job', (jobId) => {
      socket.leave(`job:${jobId}`);
    });

    socket.on('disconnect', () => {
      console.log(`[WS] Client disconnected: ${socket.id}`);
    });
  });
};

// Functions to be called by the Worker to broadcast updates
const emitJobProgress = (jobId, progress, stage, eta) => {
  if (io) {
    // بث عام لتحديثات التقدم
    io.emit('jobProgress', { jobId, progress, stage, eta });
  }
};

const emitJobCompleted = (jobId, result) => {
  if (io) {
    // بث عام باكتمال المهمة
    io.emit('jobCompleted', { jobId, result });
  }
};

const emitJobFailed = (jobId, error) => {
  if (io) {
    // بث عام في حال الفشل
    io.emit('jobFailed', { jobId, error });
  }
};

module.exports = {
  initWebSocket,
  emitJobProgress,
  emitJobCompleted,
  emitJobFailed
};