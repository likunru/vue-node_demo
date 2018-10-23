let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let routes = require('./routes/index');
let users = require('./routes/user');
let session = require('express-session');
// express处理post请求通过中间件bodyParser
let bodyParser = require('body-parser');


let port = process.env.PORT || 9999;
let app = express();

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// 设置接口及response返回的头部
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.Origin || req.headers.origin); // 允许访问的域名
  res.header('Access-Control-Allow-Headers', 'Content-type, Authorization, X-Requested-with');
  res.header('Access-Control-Allow-Methods','PUT, POST, GET, DELETE, OPTIONS'); // 允许访问的方法
  res.header('Access-Control-Allow-Credentials', true); // 可以带cookie
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
})
app.use(cookieParser());
app.use(session({
  name: config.session.name, // 设置cookie中保存session id的字段名称
  secret: config.session.secret, // 通过设置secret来计算hash值并放在cookie中，使产生的signedCookie防止篡改
  cookie: {
    maxAge: config.session.maxAge // 过期时间，过期后cookie中的session id自动删除
  },
  resave: false,
  saveUninitialized: true // 设置为false，强制创建一个session，即使用户未登录
}));

//使用路由
app.use('/', routes);
app.use('/api', users);
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
  res.status(err.status || 500);
  res.render('error');
});

// 监听端口
app.listen(port, () => {
  console.log('devServer start on port: ${port}')
})

module.exports = app;
