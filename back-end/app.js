let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let routes = require('./routes/index');
let users = require('./routes/user');
// let session = require('express-session');
let bodyParser = require('body-parser');


let port = process.env.PORT || 9999;
let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.user(session());

//使用路由
app.use('/', routes);
app.use('/users', users);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// // error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(22222222, err);
  res.status(err.status || 500);
  res.render('error');
});

// 监听端口
app.listen(port, () => {
  console.log('devServer start on port: ${port}')
})

module.exports = app;
