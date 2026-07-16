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

// =======================================================
// 🌟 مسار تشغيل رف المؤثرات في بايثون (Effects Rack) 🌟
// =======================================================
router.post('/apply-rack', authMiddleware, (req, res) => {
  const { inputFilePath, effectsChain } = req.body;

  if (!inputFilePath || !effectsChain || effectsChain.length === 0) {
    return res.status(400).json({ message: 'بيانات مفقودة أو الرف فارغ' });
  }

  // تحديد اسم ومسار الملف بعد المعالجة
  const outputFileName = `processed_${Date.now()}.wav`;
  const outputFilePath = path.join(process.cwd(), 'uploads', outputFileName);

  // مسار ملف البايثون (تأكد أن ai-engine بجوار gateway)
  const pythonScriptPath = path.resolve(__dirname, '../../../ai-engine/ProfessionalEffectsRack.py');
  
  // تحويل الفلاتر إلى نص لإرساله لبايثون
  const jsonConfig = JSON.stringify(effectsChain);

  console.log('🎧 جاري إرسال الفلاتر إلى محرك بايثون...');

  // تشغيل سكريبت بايثون
  const pythonProcess = spawn('python', [pythonScriptPath, inputFilePath, outputFilePath, jsonConfig]);

  // التقاط مخرجات بايثون لطباعتها في الكونسول
  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python: ${data}`);
  });

  // التقاط أخطاء بايثون
  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python Error: ${data}`);
  });

  // عندما ينتهي بايثون من المعالجة
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

module.exports = router;