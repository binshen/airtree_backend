var multiparty = require('multiparty');
var fs = require('fs');

module.exports = function (app, router, wrap, mongoose) {

    router.get('/list', wrap(function* (req, res, next) {
        var user = req.session.login_user;
        res.render('list_version', { page: "version", user: user });
    }));

    router.get('/upload', wrap(function* (req, res, next) {
        var user = req.session.login_user;
        res.render('upload_version', { page: "version", user: user });
    }));

    router.post('/add', wrap(function* (req, res, next) {
        var body = req.body;
        console.log(body);
        var form = new multiparty.Form({uploadDir: './public/files/'});
        form.parse(req, function(err, fields, files) {
            var filesTmp = JSON.stringify(files,null,2);
            if(err){
                console.log('parse error: ' + err);
            } else {
                console.log('parse files: ' + filesTmp);
                var inputFile = files.inputFile[0];
                var uploadedPath = inputFile.path;
                var dstPath = './public/files/' + inputFile.originalFilename;
                fs.rename(uploadedPath, dstPath, function(err) {
                    if(err){
                        console.log('rename error: ' + err);
                    } else {
                        console.log('rename ok');
                    }
                });
            }
        });
        res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: filesTmp}));

    }));

    app.use('/version', router);
};