const express = require('express');
const userController= require('../controllers/userController');  
const router = express.Router();

router.get('/get-user',userController.getUser   )

module.exports = router;