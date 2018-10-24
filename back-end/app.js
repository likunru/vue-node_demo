let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let routes = require('./routes/index');
let session = require('express-session');
// express处理post请求通过中间件bodyParser
let bodyParser = require('body-parser');
let Utils = require('./util/util');
let responseJSON = require('./util/responseJSON')
let port = process.env.PORT || 9999;
let app = express();

app.use(logger('dev'));
app.use(cookieParser());
// 如果注释下面两句，req.body获取到的是一个空对象
app.use(bodyParser.json()); // 在其他路由中间件钱（以能够通过bodypaser获取req.body）
app.use(bodyParser.urlencoded({ extended: false })); // 调试工具如果出现警告请加上extended: false
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
// 校验登陆token
app.use(function(req, res, next) {
  let url = req.originalUrl || '';
  let result = {}
  if (url.indexOf('/api/user') > -1) {
    let loginedtoken = res.cookie.get('token');
    if (loginedtoken) {
      let result = Utils.verifyToekn(loginedtoken);
      let {uid} = result;
      if (uid) {
        next();
      } else {
        result = {status: 0, msg: '请先登录！'};   
      }
    } else {
      result = {status: 0, msg: '请先登录！'};  
    }
    responseJSON(res, result);
  } else {
    next();
  }
})

//使用路由
routes(app);
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
