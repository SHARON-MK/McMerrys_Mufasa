const express = require('express');
const userController= require('../controllers/userController');  
const router = express.Router();

router.get('/events',userController.getEvents )
router.get('/events/:id', userController.getEventById);
module.exports = router;