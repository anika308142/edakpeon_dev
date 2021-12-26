var express = require('express');
const centerownerController = require('../controller/centerownerController');
var router = express.Router();
var authenticateToken = require('../middleware/authenticateToken');
var authenticateRole = require('../middleware/authenticateRole');

router.post('/register', centerownerController.createUser);
router.post('/login', centerownerController.loginUser);

router.get('/read-centerowners', authenticateToken, authenticateRole, centerownerController.readCenterowners);
router.get('/read-centerowners-by-id/:coid', authenticateToken, authenticateRole, centerownerController.readCenterownerbyCoid);

module.exports = router;
