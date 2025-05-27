const express = require('express');
const router = express.Router();
const authController = require('../controllers/userController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/verify-email', authController.verifyEmail);
router.post('/verify-otp', authController.verifyOTP);
router.post('/update-password', authController.updatePassword);

module.exports = router;