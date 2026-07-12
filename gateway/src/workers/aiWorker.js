const { Worker } = require('bullmq');
const axios = require('axios');
const { connection } = require('../config/queue');
const { emitJobProgress, emitJobCompleted, emitJobFailed } = require('../services/websocket');

const AI_ENGINE_URL = process.env.AI_ENGINE_URL || 'http://localhost:8000';

const initWorker = () => {
  console.log('[Worker] Starting AI Job Worker...');

  const worker = new Worker('ai-processing', async (job) => {
    console.log(`[Worker] Processing Job ${job.id} of type ${job.name}`);
    
    const { type, parameters, inputFileId } = job.data;
    const currentJobType = type || job.name;
    
    console.log(`[Worker] File Path to process: ${inputFileId}`); 
    
    try {
      emitJobProgress(job.id, 5, 'Initializing models...', 'Calculating');
      await job.updateProgress(5);

      const actualFilePath = inputFileId || (parameters && parameters.input_file) || "";
      
      console.log(`[Worker] Actual File Path being sent to Python: "${actualFilePath}"`);

      const response = await axios.post(`${AI_ENGINE_URL}/api/ai/process`, {
        job_id: job.id ? job.id.toString() : `job_${Date.now()}`,
        job_type: currentJobType,
        parameters: parameters || {},
        input_file: actualFilePath
      });

      for (let i = 10; i <= 90; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        emitJobProgress(job.id, i, `Processing stage ${i/10}...`, `${100 - i}s`);
        await job.updateProgress(i);
      }

      emitJobProgress(job.id, 100, 'Finalizing and saving...', '0s');
      await job.updateProgress(100);

      let finalTracks = [];
      
      if (currentJobType === 'denoise') {
         finalTracks = [
           { id: 'track-clean', name: '🎙️ Studio Enhanced (AI)', src: 'http://localhost:5000/outputs/safe_input_clean.flac', type: 'cleaned' }
         ];
      } else {
         finalTracks = [
           { id: 'track-vocals', name: '🎤 Vocals', src: 'http://localhost:5000/outputs/vocals.flac' },
           { id: 'track-drums', name: '🥁 Drums ', src: 'http://localhost:5000/outputs/drums.flac' },
           { id: 'track-bass', name: '🎸 Bass ', src: 'http://localhost:5000/outputs/bass.flac' },
           { id: 'track-other', name: '🎹 Other ', src: 'http://localhost:5000/outputs/other.flac' }
         ];
      }

      const result = {
        message: currentJobType === 'denoise' ? 'تم إعادة بناء الصوت وتنقيته بجودة الاستوديو الأسطورية! 🎙️✨' : 'تم فصل وضغط مسارات الاستوديو بنجاح! 🚀',
        tracks: finalTracks
      };

      emitJobCompleted(job.id, result);
      return result;

    } catch (error) {
      console.error(`[Worker] Job ${job.id} failed:`, error.message);
      emitJobFailed(job.id, error.message);
      throw error; 
    }
  }, { 
    connection,
    concurrency: 5 
  });

  worker.on('failed', (job, err) => {
    console.log(`[Worker] Job ${job.id} permanently failed with error ${err.message}`);
  });
};

module.exports = { initWorker };