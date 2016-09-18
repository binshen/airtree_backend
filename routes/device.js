
module.exports = function (app, router, wrap, mongoose) {

    var User = mongoose.model('User');
    var Device = mongoose.model('Device');

    router.get('/list', wrap(function* (req, res, next) {
        var tel = req.query.tel;
        if(tel == "") {
            var device = yield Device.find({}).limit(50).exec();
            res.render('list_device', { page: "device", user: req.session.login_user, device: device, tel: tel });
        } else if(tel != undefined) {
            var user = yield User.findOne({username: tel}).exec();
            if(user == null) {
                res.render('list_device', { page: "device", user: req.session.login_user, device: [], tel: tel });
            } else {
                var device = yield Device.find({userID: user._id}).exec();
                res.render('list_device', { page: "device", user: req.session.login_user, device: device, tel: tel });
            }
        } else {
            res.render('list_device', { page: "device", user: req.session.login_user, device: [], tel: "" });
        }
    }));

    app.use('/device', router);
};