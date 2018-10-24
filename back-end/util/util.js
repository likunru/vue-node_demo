const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
let util = {
  // 生成token  
  generateToken(data) {
    let created = Math.floor(Date.now() / 1000);
    let cert = fs.readFileSync(path.join(__dirname, '../config/pri.pem'));
    let token = jwt.sign({
        data,
        exp: created + 3600 * 24
    }, cert, {algorithm: 'RS256'});
    return token;
  },
  // 检验token
  verifyToken(token) {
    let cert = fs.readFileSync(path.join(__dirname, '../config/pub.pem')), res = {};
    try {
        let result = jwt.verify(token, cert, {algorithms: ['RS256']}) || {};
        let {exp = 0} = result, current = Math.floor(Date/now()/1000);
        if (current <= exp) {
            res = result.data || {};
        }
    } catch (e) {

    }
    return res;
  }
 }
module.exports = util;