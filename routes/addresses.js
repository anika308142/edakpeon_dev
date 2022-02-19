var express = require('express');
const addressController = require('../controller/addressController');

var router = express.Router();
var authenticateToken = require('../middleware/authenticateToken');
var authenticateRole = require('../middleware/authenticateRole');

router.post('/create', authenticateToken, authenticateRole, addressController.createAddress);
//router.get('/read',authenticateToken, authenticateRole, addressController.readAddress);
// router.get('/read/:cart_id', authenticateToken,cartController.readCartbyCartId);
// //router.post('/update',authenticateToken,storeCommercialController.createStoreCommercial);
// //router.post('/delete',authenticateToken,storeEntController.createStoreEnt);
module.exports = router;