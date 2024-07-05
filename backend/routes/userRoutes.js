const express = require('express');
const { registerUser, loginUser, getUserDashboard, deposit, withdraw } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/dashboard', authMiddleware, getUserDashboard);
router.post('/deposit', authMiddleware, deposit);
router.post('/withdraw', authMiddleware, withdraw);

module.exports = router;
