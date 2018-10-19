let Sequelize = require('sequelize');
let dbConfig = require('../config/db');

// 创建model
let userinfo = dbConfig.define('userinfo', {
    id: {
      type: Sequelize.STRING, //指定值的类型
      field: 'id',
      primaryKey: true
    },
    userName: {
        type: Sequelize.STRING,
        field: 'userName'
    },
    userPass: {
        type: Sequelize.STRING,
        field: 'userPass'
    }
},{
    // 如果为true,则表的名称和model相同，即user
    // 为false mysql创建的表名称会是复数users
    // 如果指定表名称本就是复数形式则不变
    freezeTableName: true
});

// 创建表
// userinfo.sync() 会创建表并且返回一个Promise对象
// 如果force = true则会把存在的表（如果userinfo已存在），先销毁再创建表
// 默认情况下forse = false

let userInfo = userinfo.sync({forse: false});


// 注册
exports.register = function(id, UserName, UserPass) {
    // 向userInfo表中插入数据
    return userinfo.create({
        id: id,
        userName: UserName,
        userPass: UserPass
    })
}

// 登录
exports.findByName = function (userName) {
    return userinfo.find({where: {userName: userName}})
}

//通过id查找
exports.findByID = function (id) {
    return userinfo.find({where: {id: id}})
}