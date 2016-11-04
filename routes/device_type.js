/**
 * Created by bin.shen on 03/11/2016.
 */

//https://www.npmjs.com/package/node-xlsx

module.exports = function (app, router, wrap, mongoose) {

    var DeviceType = mongoose.model('DeviceType');

    router.get('/list', wrap(function* (req, res, next) {

        var mac = req.query.mac;
        var deviceTypes = [];
        /*
        if(mac == "") {
            deviceTypes = yield DeviceType.find({}).exec()
        } else if(mac != undefined) {
            deviceTypes = yield DeviceType.find({mac: mac.toLowerCase() }).exec()
        } else {
            mac = "";
        }
        */
        if(mac != null && mac != "") {
            deviceTypes = yield DeviceType.find({mac:  { "$regex": mac.toLowerCase(),$options:"i" } }).sort({'created': -1}).exec()
        } else {
            deviceTypes = yield DeviceType.find({}).sort({'created': -1}).exec();
            mac = ""
        }
        res.render('list_device_type', { page: "device_type", user: req.session.login_user, device_type: deviceTypes, mac: mac });
    }));

    router.get('/add', wrap(function* (req, res, next) {

        res.render('add_device_type', {  });
    }));

    router.post('/save', wrap(function* (req, res, next) {
        var mac = req.body.mac;
        var type = req.body.type;

        var doc = new DeviceType({ mac: mac.toLowerCase(), type: type, created: Date.now() });
        yield doc.save();

        res.json({ success: 1 });
    }));

    router.post('/delete', wrap(function* (req, res, next) {
        var mac = req.body.mac;

        var doc = yield DeviceType.findOne({ mac: mac.toLowerCase() }).exec();
        yield doc.remove();

        res.json({ success: 1 });
    }));

    app.use('/device_type', router);
};