const express = require('express');
const router = express.Router();
const authController = require('../controllers/userController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

// router.get('/me', verifyToken, (req, res) => {
//   res.json({ user: req.user }); // Get user from decoded token
// });
router.post('/verify-email', authController.verifyEmail);

module.exports = router;