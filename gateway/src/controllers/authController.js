const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// المفتاح السري للتوكن (يفضل وضعه في ملف .env لاحقاً)
const JWT_SECRET = process.env.JWT_SECRET ;

// 1. دالة تسجيل مستخدم جديد (Register)
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // التحقق من وجود المستخدم مسبقاً
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'البريد الإلكتروني مسجل بالفعل' });
    }

    // تشفير كلمة المرور
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // إنشاء وحفظ المستخدم
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });
    await newUser.save();

    res.status(201).json({ message: 'تم إنشاء الحساب بنجاح، يمكنك تسجيل الدخول الآن' });

  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'خطأ في الخادم أثناء التسجيل' });
  }
};

// 2. دالة تسجيل الدخول (Login)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // البحث عن المستخدم
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'بيانات الدخول غير صحيحة' });
    }

    // التحقق من كلمة المرور
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'بيانات الدخول غير صحيحة' });
    }

    // توليد التوكن (JWT)
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' } // التوكن صالح لمدة 7 أيام
    );

    res.status(200).json({
      message: 'تم تسجيل الدخول بنجاح',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'خطأ في الخادم أثناء تسجيل الدخول' });
  }
};