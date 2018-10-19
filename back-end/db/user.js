let Sequelize = require('sequelize');
let dbConfig = require('../config/db');

// 创建model
let userinfo = dbConfig.define('userinfo', {
    id: {
      type: Sequelize.INTEGER(11), //指定值的类型
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


// 添加新的用户
exports.adduser = function(id, UserName, UserPass) {
    // 向user表中插入数据
    return userInfo.create({
        id: id,
        userName: UserName,
        userPass: userPass
    })
}

//通过用户名查找
exports.findByName = function (userName) {
    return userInfo.find({where: {userName: userName}})
}