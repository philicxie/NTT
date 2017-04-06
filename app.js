var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index               = require('./routes/index'            );
var users               = require('./routes/users'            );
var mainRemote          = require('./routes/mainRemote'       );
var signinRemote        = require('./routes/signinRemote'     );
var cartRemote          = require('./routes/cartRemote'       );
var authorityRemote     = require('./routes/authorityRemote'  );
var booksManageRemote   = require('./routes/booksManageRemote');
var payRemote           = require('./routes/payRemote'        );

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/'             , index             );
app.use('/users'        , users             );
app.use('/main'         , mainRemote        );
app.use('/signin'       , signinRemote      );
app.use('/cart'         , cartRemote        );
app.use('/authority'    , authorityRemote   );
app.use('/books_manage' , booksManageRemote );
app.use('/pay'          , payRemote         );

// main----------------------------------
//var User = require('./routes/db').User;
// var Book = require('./routes/db').Book;
//
//
// Book.find(function(err, doc){
//   if(err) return console.error(err);
//   console.log(doc);
// });
//!main----------------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
