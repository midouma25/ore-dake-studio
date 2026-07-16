const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // 🌟 أضفنا مكتبة التعامل مع الملفات والمجلدات
const Asset = require('../models/Asset');
const authMiddleware = require('../middleware/authMiddleware'); 

// 🌟 التأكد من وجود مجلد uploads، وإنشاؤه تلقائياً إن لم يكن موجوداً
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('📁 تم إنشاء مجلد uploads تلقائياً');
}

// إعداد Multer لتحديد مسار واسم الملف المرفوع
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // سيتم الحفظ في المجلد المضمون وجوده
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// مسار الرفع (محمي بـ authMiddleware)
router.post('/', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'الرجاء اختيار ملف للرفع' });
    }

    const newAsset = new Asset({
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      mimeType: req.file.mimetype,
      size: req.file.size,
      owner: req.user.userId,
      assetType: 'raw' 
    });

    await newAsset.save();
    console.log('✅ تم حفظ الملف في قاعدة البيانات، ID:', newAsset._id);

    res.status(201).json({
      message: 'تم رفع الملف وحفظه في قاعدة البيانات بنجاح',
      asset: newAsset,
      assetId: newAsset._id,
      filePath: req.file.path
    });

  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'خطأ في الخادم أثناء حفظ الملف' });
  }
});

module.exports = router;