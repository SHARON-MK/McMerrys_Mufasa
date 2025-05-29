const express = require('express');
const router = express.Router();
const adminConroller = require('../controllers/adminController');

router.get('/get-admin',adminConroller.getAdmin)


module.exports = router;
