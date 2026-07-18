const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const authMiddleware = require('../middleware/authMiddleware');

// 🌟 استدعاء طابور الذكاء الاصطناعي (تأكد من أن هذا المسار يطابق مشروعك) 🌟
// إذا كان ملف الطابور في مكان آخر، قم بتعديل المسار، وإلا اتركه هكذا
const { aiQueue } = require('../workers/aiWorker'); 

// POST /api/ai/jobs - Submit a new AI task
router.post('/jobs', async (req, res) => {
  try {
    const { type, title, parameters, inputFileId, priority = 'normal' } = req.body;
    
    const jobOptions = {};
    if (priority === 'high') jobOptions.priority = 1;
    if (priority === 'low') jobOptions.priority = 3;

    // Add job to BullMQ
    const job = await aiQueue.add(type, {
      type,
      title,
      parameters,
      inputFileId,
      userId: req.user?.id || 'anonymous',
    }, jobOptions);

    res.status(202).json({
      success: true,
      message: 'Job successfully queued',
      jobId: job.id,
      status: 'queued'
    });

  } catch (error) {
    console.error('[API] Error queueing job:', error);
    res.status(500).json({ success: false, message: 'Failed to queue job' });
  }
});

// GET /api/ai/jobs/:id - Get job status
router.get('/jobs/:id', async (req, res) => {
  try {
    const job = await aiQueue.getJob(req.params.id);
    
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    const state = await job.getState();
    const progress = job.progress;

    res.json({
      success: true,
      jobId: job.id,
      state,
      progress,
      result: job.returnvalue
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching job status' });
  }
});

// 🌟 المسار المحدث لتطبيق الفلاتر (كامل أو جزئي) 🌟
router.post('/apply-rack', authMiddleware, (req, res) => {
  const { inputFilePath, effectsChain, isRegion, start_time, end_time } = req.body;

  if (!inputFilePath || !effectsChain || effectsChain.length === 0) {
    return res.status(400).json({ message: 'بيانات مفقودة أو الرف فارغ' });
  }

  const outputFileName = `processed_${Date.now()}.wav`;
  const outputFilePath = path.join(process.cwd(), 'uploads', outputFileName);
  const pythonScriptPath = path.resolve(__dirname, '../../../ai-engine/ProfessionalEffectsRack.py');
  
  const jsonConfig = JSON.stringify(effectsChain);
  
  // تحديد المتغيرات الجديدة
  const mode = isRegion ? 'region' : 'full';
  const startTimeStr = start_time ? start_time.toString() : "0";
  const durationStr = (start_time !== undefined && end_time !== undefined) ? (end_time - start_time).toString() : "0";

  console.log(`🎧 جاري المعالجة وضع (${mode})...`);

  // تمرير الترتيب الصحيح لبايثون
  const pythonProcess = spawn('python', [
      pythonScriptPath, inputFilePath, outputFilePath, jsonConfig, 
      startTimeStr, durationStr, mode
  ]);

  pythonProcess.stdout.on('data', (data) => console.log(`Python: ${data}`));
  pythonProcess.stderr.on('data', (data) => console.error(`Python Error: ${data}`));

  pythonProcess.on('close', (code) => {
    if (code === 0 && fs.existsSync(outputFilePath)) {
      res.status(200).json({ 
        message: 'تم تطبيق الفلاتر بنجاح', 
        processedFileUrl: `http://localhost:5000/uploads/${outputFileName}`,
        processedFilePath: outputFilePath
      });
    } else {
      res.status(500).json({ message: 'فشلت عملية تطبيق الفلاتر (Python Error)' });
    }
  });
});

// 🌟 المسار المحدث للمعاينة اللحظية 🌟
router.post('/preview-rack', (req, res) => {
    const { file_path, start_time, end_time, effects } = req.body;
    
    if (!file_path || !effects) return res.status(400).json({ error: 'Missing Data' });

    const duration = end_time - start_time;
    const outputFileName = `preview_${Date.now()}.wav`;
    const outputPath = path.join(__dirname, '../../uploads', outputFileName); 
    const pythonScriptPath = path.join(__dirname, '../../../ai-engine/ProfessionalEffectsRack.py');

    // لاحظ إضافة كلمة 'preview' في النهاية
    const pythonProcess = spawn('python', [
        pythonScriptPath, file_path, outputPath, JSON.stringify(effects),
        start_time.toString(), duration.toString(), 'preview'
    ]);

    pythonProcess.stdout.on('data', (data) => console.log(`[Preview]: ${data.toString()}`));
    pythonProcess.stderr.on('data', (data) => console.error(`[Preview Err]: ${data.toString()}`));

    pythonProcess.on('close', (code) => {
        if (code === 0 && fs.existsSync(outputPath)) {
            res.json({ preview_url: `http://localhost:5000/uploads/${outputFileName}` });
        } else {
            res.status(500).json({ error: 'Processing failed' });
        }
    });
});

module.exports = router;