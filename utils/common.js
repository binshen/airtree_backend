/**
 * Created by bin.shen on 6/20/16.
 */

var crypto = require('crypto');
var request = require('request');

module.exports.md5 = function(value) {
    return crypto.createHash('md5').update(value).digest("hex");
};

module.exports.sendMsg = function(tel, msg, callback) {
    var msg = encodeURIComponent(msg);
    var url = "http://120.26.66.24/msg/HttpBatchSendSM?account=mred_hy&pswd=mred_hy123&product=191991231&mobile="+tel+"&msg="+msg+"&needstatus=true";
    request(url, function (err, resp, body) {
        if(err) return callback(err);
        callback(null, body);
    });
};