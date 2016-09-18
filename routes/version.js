
var multer  = require('multer');
var fs = require('fs');
var moment = require('moment');

module.exports = function (app, router, wrap, mongoose) {

    var Version = mongoose.model('Version');

    router.get('/list', wrap(function* (req, res, next) {
        var version = yield Version.find().exec();
        res.render('list_version', { page: "version", user: req.session.login_user, version: version, moment: moment });
    }));

    router.get('/upload', wrap(function* (req, res, next) {

        res.render('upload_version', { page: "version", user: req.session.login_user });
    }));

/*
    {
        type: '1', ver: '1', md5: '2', size: '3', sys: '4', wlan: '5'
    }
    {
        fieldname: 'uploadfile',
        originalname: '工业级空气检测仪报警系统架构设计.docx',
        encoding: '7bit',
        mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        destination: 'public/files/',
        filename: 'e6b0261b479072baa501be007a53dfc3',
        path: 'public/files/e6b0261b479072baa501be007a53dfc3',
        size: 121634
    }
*/
    router.post('/edit', multer({ dest: 'public/files/' }).single('uploadfile'), wrap(function* (req, res, next) {
        var data = req.body;
        var file = req.file;
        var v_id = data.v_id;
        if(v_id == "") {
            data.size = Math.ceil(file.size / 1000);
            data.file = file.filename;
            data.created = Date.now();
            var doc = new Version(data);
            yield doc.save();
        } else {
            var doc = yield Version.findOne({_id: v_id}).exec();
            if(doc != null) {
                fs.unlinkSync(file.path);

                doc.size = Math.ceil(file.size / 1000);
                doc.file = file.filename;
                doc.created = Date.now();
                yield doc.save();
            }
        }

        var user = req.session.login_user;
        res.render('list_version', { page: "version", user: user });
    }));

    router.get('/upload/:v_id', wrap(function* (req, res, next) {
        var v_id = req.params.v_id;
        var version = yield Version.findOne({_id: v_id}).exec();
        res.render('upload_version', { page: "version", user: req.session.login_user, version: version });
    }));

    app.use('/version', router);
};