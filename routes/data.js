
var moment = require('moment');

module.exports = function (app, router, wrap, mongoose) {

    var Data = mongoose.model('Data');

    router.get('/list', wrap(function* (req, res, next) {
        var mac = req.query.mac;
        var data = [];
        if(mac == "") {
            data = yield Data.find({}).sort({'created': -1}).limit(10).exec()
        } else if(mac != undefined) {
            data = yield Data.find({mac: mac.toLowerCase() }).sort({'created': -1}).limit(10).exec()
        } else {
            mac = "";
        }
        var user = req.session.login_user;
        res.render('list_data', { page: "data", user: user, data: data, mac: mac, moment: moment });
    }));

    app.use('/data', router);
};