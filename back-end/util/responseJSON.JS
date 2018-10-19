let responseJSON = function(res, req) {
    if (typeof req === 'undefined') {
        res.json({
            code: '-200', 
            data: {status: 0, msg: '操作失败'}
        });
    } else {
        res.json({
            code: '200', 
            data: {status: req.status, data: req.data || {} , msg: req.msg}
        });
    }
}
module.exports = responseJSON
