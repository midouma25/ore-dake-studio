const express = require('express');
const router = express.Router();
const { aiQueue } = require('../config/queue');

// POST /api/ai/jobs - Submit a new AI task
router.post('/jobs', async (req, res) => {
  try {
    const { type, title, parameters, inputFileId, priority = 'normal' } = req.body;
    
    // In a real app, validate user credits and file ownership here

    const jobOptions = {};
    if (priority === 'high') jobOptions.priority = 1;
    if (priority === 'low') jobOptions.priority = 3;

    // Add job to BullMQ
    const job = await aiQueue.add(type, {
      type,
      title,
      parameters,
      inputFileId,
      userId: req.user?.id || 'anonymous', // Assuming auth middleware sets req.user
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

module.exports = router;