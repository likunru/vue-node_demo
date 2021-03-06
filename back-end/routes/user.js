let express = require('express');
let router = express.Router();
let responseJSON = require('../util/responseJSON')
let uuid = require('node-uuid');
let crypto = require('crypto');
let Utils = require('../util/util');
// 导入sql模块
// let mysql = require('mysql');
// let dbConfig = require('../config/db');
// let userSQL = require('../db/UserSQL');
let user = require('../db/user');
// 使用db.js的配置信息创建一个mysql链接池
// let pool = mysql.createPool(dbConfig.mysql);
// 响应一个json数据
// 注册
router.post('/regist', function(req, res, next) {
    // 从链接池获取链接
    // pool.getConnection(function(err, connection) {
    //     // req.query: 用来接收get方式提交的参数
    //     // req.body: 用来接收post提交的参数，
    //     // req.params: 两种都能接收到
    //     //获取前台页面传过来的参数
    //     let param = req.query || req.params;
    //     // 建立链接，添加一个用户的信息
    //     connection.query(userSQL.insert, [param.id, param.name], function(err, result) {
    //         if(result) {
    //             result = {
    //                 code: 200,
    //                 msg: '增加成功'
    //             }
    //         }
    //         console.log(err, result)
    //         // 以json数据测试，把操作结果返回给前台页面
    //         responseJSON(res, result);
    //         // 释放链接
    //         connection.release();
    //     })
    // })
    let param = req.body || req.params;
    let uid = uuid.v1();
    let data = {};
    user.findByName(param.username).then(function(result) {
        if (!result) { // 返回null说明用户名不存在
            // 使用md5对密码进行加密
            let md5 = crypto.createHash('md5');
            let userPwd = md5.update(param.pass).digest('hex');
            user.register(uid, param.username, userPwd).then(function(result) {
                if (result) {
                    data = {status: 1, msg: '注册成功！'};
                } else {
                    data = {status: 0, msg: '注册失败！'};
                }
                responseJSON(res, data);
            }).catch(function (err) {
                return
            })   
        } else {
          data = {status: 0, msg: '用户名已存在！'};
          responseJSON(res, data);
        }
    })
})
// 登录
router.post('/login', function (req, res, next) {
    let param = req.body || req.params;
    user.findByName(param.username).then(function(result) {
        if (!result) { // 返回null说明用户名不存在
            result = {status: 0, msg: '用户名不存在！'};
        } else {
           let pass = result.userPass;
           // 使用md5对登录密码进行加密后进行比对
           let md5 = crypto.createHash('md5');
           let userPwd = md5.update(param.pass).digest('hex');
           // 输入密码不正确
           if (pass !== userPwd) {
             result = {status: 0, msg: '密码不正确，请重新输入！'};
           } else {
             // 使用token进行登陆验证  
             let uid = result.id;
             let token = Utils.generateToken({uid});
             res.cookie('token', token);
             result = {status: 1, msg: '登录成功！', data: {token}}; 
           }
        }
        responseJSON(res, result); 
    }).catch(function(err) {
       return
    })
})

// 登出
router.post('/signOut', function (req, res, next) {

})

// 获取用户信息
router.get('/api/user', function (req, res, next) {
    let uid = req;
    let resData = {}
    user.findByID(uid).then(function(result) {
        if (result) {
            resData = {status: 1, msg: '', data: {result}}; 
        } else {
            resData = {status: 0, msg: '获取用户信息失败！'};  
        }
        responseJSON(res, resData); 
    })
})
module.exports = router;
