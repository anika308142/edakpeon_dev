var express = require('express');
var app = express()
var router = express.Router();
var userRouter = require('./users')
var centerownerRouter = require('./centerowners')
var shopkeeperRouter = require('./shopkeepers')
var productRouter = require('./products')
var adminRouter = require('./admins')
/* GET home page. */
app.get('/', function (req, res, next) {
  res.send("blog ");
});
router.use('/users', userRouter);
router.use('/centerowners', centerownerRouter);
router.use('/shopkeepers', shopkeeperRouter);
router.use('/products', productRouter);
router.use('/admins', adminRouter);
module.exports = router;
