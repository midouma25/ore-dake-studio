const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'ore_dake_super_secret_key_2026';

module.exports = (req, res, next) => {
  // جلب التوكن من الهيدر
  const token = req.header('Authorization')?.split(' ')[1]; // يتوقع صيغة: Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'غير مصرح لك بالدخول، التوكن مفقود' });
  }

  try {
    // فك تشفير التوكن والتحقق منه
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // إضافة بيانات المستخدم للطلب الحالي
    next(); // السماح بالمرور
  } catch (error) {
    res.status(401).json({ message: 'التوكن غير صالح أو منتهي الصلاحية' });
  }
};