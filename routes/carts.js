var express = require('express');
const cartController = require('../controller/cartController');

var router = express.Router();
var authenticateToken = require('../middleware/authenticateToken');
var authenticateRole = require('../middleware/authenticateRole');

router.post('/create', authenticateToken, authenticateRole, cartController.createCart);
router.get('/read',authenticateToken, authenticateRole, cartController.readCart);
router.get('/read/:cart_id', authenticateToken,cartController.readCartbyCartId);
//router.post('/update',authenticateToken,storeCommercialController.createStoreCommercial);
//router.post('/delete',authenticateToken,storeEntController.createStoreEnt);
module.exports = router;