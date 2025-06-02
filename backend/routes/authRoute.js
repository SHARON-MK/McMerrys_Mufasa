const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Admin authentication routes
router.post('/admin/login', authController.adminLogin);
router.post('/admin/first', authController.createFirstAdmin);

module.exports = router; 