var express = require('express');
const userController = require('../controller/userController');
var router = express.Router();


router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);

module.exports = router;
