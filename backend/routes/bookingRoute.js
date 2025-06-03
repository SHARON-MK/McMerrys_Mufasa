const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Public booking routes (no login required)
router.post('/', bookingController.createBooking);
router.get('/email/:email', bookingController.getBookingByEmail);
router.get('/:id', bookingController.getBookingById);

module.exports =router; 