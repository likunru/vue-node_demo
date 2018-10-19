// 配置mysql
let Sequelize = require('sequelize')
module.exports = new Sequelize('test_lkr', 'root', 'xxxxxx', {
    host: 'xxxxxxxxx',
    dialect: 'mysql',
    pool: {
        max: 5, // 链接池中最大链接数量
        min: 0, // 链接池中最小连接数量
        idle: 10000 // 如果一个线程10秒钟内没有被使用过的话，那么就是放线程
    }
})