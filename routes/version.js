
var multer  = require('multer');
var fs = require('fs');
var moment = require('moment');
var f_path = require('path');
var common = require('../utils/common');

var bashPath = __dirname + '/../public/files/';

module.exports = function (app, router, wrap, mongoose) {

    var Version = mongoose.model('Version');

    router.get('/list', wrap(function* (req, res, next) {
        var version = yield Version.find().sort({created: -1}).exec();
        res.render('list_version', { page: "version", user: req.session.login_user, version: version, moment: moment });
    }));

    router.get('/upload', wrap(function* (req, res, next) {

        res.render('upload_version', { page: "version", user: req.session.login_user, version: {} });
    }));

/*
    {
        type: '1', ver: '1', md5: '2', dev: '3', sys: '4', wlan: '5'
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
            var fullname = file.filename + f_path.extname(file.originalname);
            fs.renameSync(bashPath + file.filename, bashPath + fullname);
            data.file = fullname;
            data.origin = file.originalname;
            data.created = Date.now();
            data.md5 = common.getFileMD5(bashPath + fullname);
            var doc = new Version(data);
            yield doc.save();
        } else {
            var doc = yield Version.findById(v_id).exec();
            if(doc != null) {
                doc.created = Date.now();
                doc.type = data.type;
                doc.ver = data.ver;
                doc.dev = data.dev;
                doc.sys = data.sys;
                doc.wlan = data.wlan;
                if(file != null) {
                    var path = bashPath + doc.file;
                    if(fs.existsSync(path)) {
                        fs.unlinkSync(path);
                    }

                    doc.size = Math.ceil(file.size / 1000);
                    var fullname = file.filename + f_path.extname(file.originalname);
                    fs.renameSync(bashPath + file.filename, bashPath + fullname);
                    doc.file = fullname;
                    doc.md5 = common.getFileMD5(bashPath + fullname);
                    doc.origin = file.originalname;
                }
                yield doc.save();
            }
        }
        res.redirect('/version/list');
    }));

    router.get('/upload/:v_id', wrap(function* (req, res, next) {
        var v_id = req.params.v_id;
        var version = yield Version.findOne({_id: v_id}).exec();
        res.render('upload_version', { page: "version", user: req.session.login_user, version: version });
    }));

    router.get('/delete/:v_id', wrap(function* (req, res, next) {
        var v_id = req.params.v_id;
        var version = yield Version.findById(v_id).exec();
        var path = bashPath + version.file;
        if(fs.existsSync(path)) {
            fs.unlinkSync(path);
        }
        yield version.remove();
        res.redirect('/version/list');
    }));

    app.use('/version', router);
};