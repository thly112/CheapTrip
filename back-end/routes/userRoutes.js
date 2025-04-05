// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

router.get('/profile', authenticateToken, userController.getUser);
router.put('/profile', authenticateToken, userController.updateUser);
router.delete('/profile', [authenticateToken, authorizeRole('admin')], userController.deleteUser); // Chỉ admin mới có thể xóa

module.exports = router;