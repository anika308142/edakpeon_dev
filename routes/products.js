var express = require('express');
const productController = require('../controller/productController');

var router = express.Router();
var authenticateToken = require('../middleware/authenticateToken');
var authenticateRole = require('../middleware/authenticateRole');

router.post('/create', authenticateToken, authenticateRole, productController.createProduct);
router.get('/read', productController.readProducts);
router.get('/:pid', productController.readProductbyPid);
//router.post('/update',authenticateToken,storeCommercialController.createStoreCommercial);
//router.post('/delete',authenticateToken,storeEntController.createStoreEnt);
module.exports = router;