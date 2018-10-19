let express = require('express');
let router = express.Router();
// 导入sql模块
// let mysql = require('mysql');
// let dbConfig = require('../config/db');
// let userSQL = require('../db/UserSQL');
let user = require('../db/user');

// 使用db.js的配置信息创建一个mysql链接池
// let pool = mysql.createPool(dbConfig.mysql);
// 响应一个json数据
let responseJSON = function(res, req) {
    if (typeof req === 'undefined') {
        res.json({code: '-200', msg: '操作失败'});
    } else {
        res.json(req);
    }
}
// 添加用户
router.get('/addUser', function(req, res, next) {
    // 从链接池获取链接
    pool.getConnection(function(err, connection) {
        // req.query: 用来接收get方式提交的参数
        // req.body: 用来接收post提交的参数，express处理post请求通过中间件bodyParser
        // req.params: 两种都能接收到
        //获取前台页面传过来的参数
        let param = req.query || req.params;
        // 建立链接，添加一个用户的信息
        connection.query(userSQL.insert, [param.id, param.name], function(err, result) {
            if(result) {
                result = {
                    code: 200,
                    msg: '增加成功'
                }
            }
            console.log(err, result)
            // 以json数据测试，把操作结果返回给前台页面
            responseJSON(res, result);
            // 释放链接
            connection.release();
        })
    })
    // let param = req.query || req.params;
    // user.adduser(param.id, param.username, param.userpass).then(function(err, result) {
    //     if (result) {
    //         resule = {
    //             code: 200,
    //             msg: '增加成功'
    //         }
    //     }
    //     responseJSON(res, result);
    // }) 
})
module.exports = router;
