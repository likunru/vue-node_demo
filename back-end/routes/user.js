let express = require('express');
let router = express.Router();
let responseJSON = require('../util/responseJSON')
let uuid = require('node-uuid');
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
            user.register(uid, param.username, param.pass).then(function(result) {
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
           // 输入密码不正确
           if (pass !== param.pass) {
             result = {status: 0, msg: '密码不正确，请重新输入！'};
           } else {
             result = {status: 1, msg: '登录成功！'}; 
           }
        }
        responseJSON(res, result); 
    }).catch(function(err) {
       return
    })
})
module.exports = router;
