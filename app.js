const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser=require('body-parser');
const app = express();




dotenv.config();


//const appPort = process.env.PORT;
//const fileUpload = require('express-fileupload');


var indexRouter = require('./routes/index');



//app.use(fileUpload());
app.use(cors())
//app.use(cors( {exposedHeaders: ["Authorization",'Auth','Cookie'] ,withCredentials: true}))

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

//app.set('view engine', 'html');
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//console.log(require('crypto').randomBytes(64).toString('hex'))
// error handler
// app.use(function(err, req, res, next) {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   res.status(err.status || 500);
//  res.render('error');
// });

console.log('Express listening on port', process.env.PORT);


module.exports = app;
