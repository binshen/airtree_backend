/**
 * Created by bin.shen on 03/11/2016.
 */

module.exports = function (app, router, wrap, mongoose) {

    var DeviceType = mongoose.model('DeviceType');

    router.get('/list', wrap(function* (req, res, next) {

        var deviceTypes = yield DeviceType.find({}).exec();
        console.log(deviceTypes);

        res.render('list_device_type', { page: "device_type" });
    }));

    app.use('/device_type', router);
};