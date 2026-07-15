const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// مسار التسجيل: POST /api/auth/register
router.post('/register', register);

// مسار الدخول: POST /api/auth/login
router.post('/login', login);

module.exports = router;