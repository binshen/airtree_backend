/**
 * Created by bin.shen on 03/11/2016.
 */

//https://www.npmjs.com/package/node-xlsx

module.exports = function (app, router, wrap, mongoose) {

    var DeviceType = mongoose.model('DeviceType');

    router.get('/list', wrap(function* (req, res, next) {

        var deviceTypes = yield DeviceType.find({}).exec();
        res.render('list_device_type', { page: "device_type", user: req.session.login_user, device_type: deviceTypes });
    }));

    router.get('/add', wrap(function* (req, res, next) {

        res.render('add_device_type', {  });
    }));

    app.use('/device_type', router);
};