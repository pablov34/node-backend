var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
const jwt = require('jsonwebtoken');

var app = express();

var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var productosRouter = require('./routes/productos');


//secret key para JWT 
app.set('secretKey',process.env.SECRET_KEY)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/productos',validateUser, productosRouter);


function validateUser(req,res,next){
  console.log(req.app.get('secretKey'))
  
  jwt.verify(req.headers['x-access-token'],req.app.get('secretKey'),
  (err,decoded) =>{
    if(err)
    {
      res.json({message:err.message})
    }else
    {
      console.log(decoded)
      req.body.userToken = decoded
      next();
    }
  })
}
app.validateUser = validateUser;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
