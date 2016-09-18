
module.exports = function (app, router, wrap, mongoose) {

    var Data = mongoose.model('Data');

    router.get('/list', wrap(function* (req, res, next) {
        var mac = req.query.mac;
        var data = [];
        if(mac != undefined) {
            data = yield Data.find({mac: mac.toLowerCase() }).sort({'created': -1}).limit(10).exec()
        } else {
            mac = "";
        }
        var user = req.session.login_user;
        res.render('list_data', { page: "data", user: user, data: data, mac: mac });
    }));

    app.use('/data', router);
};