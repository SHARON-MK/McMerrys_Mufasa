const express = require('express');
const router = express.Router();
const userController= require('../controllers/userController');  


router.get('/events',userController.getEvents )
router.get('/events/:id', userController.getEventById);
module.exports =router;