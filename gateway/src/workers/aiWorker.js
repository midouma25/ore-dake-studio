const { Worker } = require('bullmq');
const axios = require('axios');
const { connection } = require('../config/queue');
const { emitJobProgress, emitJobCompleted, emitJobFailed } = require('../services/websocket');

const AI_ENGINE_URL = process.env.AI_ENGINE_URL || 'http://localhost:8000';

const initWorker = () => {
  console.log('[Worker] Starting AI Job Worker...');

  const worker = new Worker('ai-processing', async (job) => {
    console.log(`[Worker] Processing Job ${job.id} of type ${job.name}`);
    
    // استخراج مسار الملف والمتغيرات من بيانات المهمة
    const { type, parameters, inputFileId } = job.data;
    
    // سطر مهم جداً للتحقق (Debugging) لنرى هل المسار وصل للـ Worker أم لا
    console.log(`[Worker] File Path to process: ${inputFileId}`); 
    
    try {
      // 1. Initial Progress
      emitJobProgress(job.id, 5, 'Initializing models...', 'Calculating');
      await job.updateProgress(5);

     const actualFilePath = inputFileId || (parameters && parameters.input_file) || "";
      
      console.log(`[Worker] Actual File Path being sent to Python: "${actualFilePath}"`); // للتأكد بالعين المجردة

      // 2. Call the Python AI Engine API
      const response = await axios.post(`${AI_ENGINE_URL}/api/ai/process`, {
        job_id: job.id ? job.id.toString() : `job_${Date.now()}`,
        job_type: type || job.name,
        parameters: parameters || {},
        input_file: actualFilePath // نرسل المسار المستخرج هنا
      });

      // 3. Simulate processing time and progress updates
      for (let i = 10; i <= 90; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Fake delay
        emitJobProgress(job.id, i, `Processing stage ${i/10}...`, `${100 - i}s`);
        await job.updateProgress(i);
      }

      // 4. Job Finished
// 4. Job Finished
      emitJobProgress(job.id, 100, 'Finalizing and saving...', '0s');
      await job.updateProgress(100);

      // --- التعديل هنا: إرسال روابط المسارات الأربعة لواجهة React ---
// --- إرسال روابط الـ MP3 الخفيفة لواجهة React ---
      const result = {
        message: 'تم فصل وضغط مسارات الاستوديو بنجاح! 🚀',
        tracks: [
          { id: 'track-vocals', name: '🎤 Vocals (المغني)', src: 'http://localhost:5000/outputs/vocals.mp3' },
          { id: 'track-drums', name: '🥁 Drums (الإيقاع)', src: 'http://localhost:5000/outputs/drums.mp3' },
          { id: 'track-bass', name: '🎸 Bass (البيس)', src: 'http://localhost:5000/outputs/bass.mp3' },
          { id: 'track-other', name: '🎹 Other (باقي الآلات)', src: 'http://localhost:5000/outputs/other.mp3' }
        ]
      };

      emitJobCompleted(job.id, result);
      return result;

    } catch (error) {
      console.error(`[Worker] Job ${job.id} failed:`, error.message);
      emitJobFailed(job.id, error.message);
      throw error; // Let BullMQ handle retries
    }
  }, { 
    connection,
    concurrency: 5 // Process up to 5 jobs simultaneously
  });

  worker.on('failed', (job, err) => {
    console.log(`[Worker] Job ${job.id} permanently failed with error ${err.message}`);
  });
};

module.exports = { initWorker };