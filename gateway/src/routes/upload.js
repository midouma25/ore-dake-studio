const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// إنشاء مجلد uploads إذا لم يكن موجوداً
const uploadDir = path.join(__dirname, '../../../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// إعداد محرك الحفظ (أين وكيف سيتم حفظ الملف)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // إضافة طابع زمني لمنع تداخل أسماء الملفات
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'audio-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// مسار استقبال الملف
router.post('/', upload.single('file'), (req, res) => {
        if (!req.file) {
        return res.status(400).json({ success: false, message: 'لم يتم رفع أي ملف' });
    }
    
    console.log(`[Upload] File received: ${req.file.filename}`);
    
    res.json({
        success: true,
        message: 'تم رفع الملف بنجاح',
        filePath: req.file.path,
        fileName: req.file.filename
    });
});

module.exports = router;