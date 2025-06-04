const express = require('express');
const router = express.Router();
const userController= require('../controllers/userController');  


router.post('/create-booking/:id',userController.createBooking);
router.get('/events',userController.getEvents )
router.get('/events/:id', userController.getEventById);
router.post("/send-mail", userController.sendEmail);

module.exports =router;