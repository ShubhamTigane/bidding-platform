const express = require('express');
const { check } = require('express-validator');
const { register, login, getProfile, resetPassword } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', [
  check('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.'),
  check('email').isEmail().withMessage('Email is invalid.'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
], register);

router.post('/login', login);

router.get('/profile', authMiddleware, getProfile);

router.post('/reset-password', [
  check('email').isEmail().withMessage('Email is invalid.'),
  check('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
], resetPassword);

module.exports = router;