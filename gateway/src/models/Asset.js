const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true,
    unique: true
  },
  path: {
    type: String,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: false // قد يتم رفع الملف للمكتبة العامة قبل إضافته لمشروع
  },
  assetType: {
    type: String,
    enum: ['raw', 'processed', 'final'],
    default: 'raw'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Asset', assetSchema);