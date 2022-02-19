var express = require('express');
const orderController = require('../controller/orderController');
var router = express.Router();

var authenticateToken = require('../middleware/authenticateToken');
var authenticateRole = require('../middleware/authenticateRole');

router.post('/create', authenticateToken, authenticateRole, orderController.createOrder);
router.get('/readbyUser', authenticateToken, authenticateRole, orderController.readOrderByUser);
router.post('/readbyStatus', authenticateToken, authenticateRole, orderController.readOrderByStatus);
router.patch('/updateStatus', authenticateToken, authenticateRole, orderController.updateOrderStatus);
module.exports = router;