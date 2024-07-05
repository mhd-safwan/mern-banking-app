const express = require('express');
const { loginAdmin, getUsers, disableUser } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login', loginAdmin);
router.get('/users', authMiddleware, getUsers);
router.put('/user/:id/disable', authMiddleware, disableUser);

module.exports = router;
