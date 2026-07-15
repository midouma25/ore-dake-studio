const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'Untitled Project'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['audio', 'video'], // بناءً على Twin Portals
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'processing', 'completed'],
    default: 'draft'
  },
  settings: {
    type: Object,
    default: {} // لحفظ إعدادات المشروع الخاصة مثل الفلاتر المستخدمة
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);