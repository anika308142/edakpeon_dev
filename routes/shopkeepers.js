var express = require('express');
var router = express.Router();
var authenticateToken = require('../middleware/authenticateToken');
var authenticateRole = require('../middleware/authenticateRole');
const shopkeeperController = require('../controller/shopkeeperController');
const storeCommercialController = require('../controller/storeCommercialController');
const storeEntController = require('../controller/storeEntController');



router.post('/register', shopkeeperController.createUser);
router.post('/login', shopkeeperController.loginUser);
router.get('/read-Shopkeepers/:skid', authenticateToken, authenticateRole, shopkeeperController.readShopkeeperbySkid);
router.get('/read-Shopkeepers', authenticateToken, authenticateRole, shopkeeperController.readShopkeepers);

//ent
router.post('/create-store-enterprise', authenticateToken, authenticateRole, storeEntController.createStoreEnt);
router.post('/approve-store-enterprise', authenticateToken, authenticateRole, storeEntController.updateStoreEntApprove);
router.get('/read-by-id-store-enterprise/:seid', authenticateToken, authenticateRole, storeEntController.readStoreEntbySeid);
router.get('/readApproved-store-enterprise', authenticateToken, authenticateRole, storeEntController.readStoreEntApproved);
router.get('/readPending-store-enterprise', authenticateToken, authenticateRole, storeEntController.readStoreEntPending);
//com
router.post('/create-store-commercial', authenticateToken, authenticateRole, storeCommercialController.createStoreCommercial);
router.post('/approve-store-commercial', authenticateToken, authenticateRole, storeCommercialController.updateStoreCommercialApprove);
router.get('/read-by-id-store-commercial/:scid', authenticateToken, authenticateRole, storeCommercialController.readStoreCommercialbyScid);
router.get('/readApproved-store-commercial', authenticateToken, authenticateRole, storeCommercialController.readStoreCommercialApproved);
router.get('/readPending-store-commercial', authenticateToken, authenticateRole, storeCommercialController.readStoreCommercialPending);
module.exports = router;