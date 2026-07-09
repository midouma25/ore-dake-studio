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
    io.to(`job:${jobId}`).emit('job:progress', { jobId, progress, stage, eta });
  }
};

const emitJobCompleted = (jobId, result) => {
  if (io) {
    io.to(`job:${jobId}`).emit('job:completed', { jobId, result });
  }
};

const emitJobFailed = (jobId, error) => {
  if (io) {
    io.to(`job:${jobId}`).emit('job:failed', { jobId, error });
  }
};

module.exports = {
  initWebSocket,
  emitJobProgress,
  emitJobCompleted,
  emitJobFailed
};