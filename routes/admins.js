var express = require('express');
const adminController = require('../controller/adminController');
var router = express.Router();


router.post('/register', adminController.createUser);
router.post('/login', adminController.loginUser);


module.exports = router;
