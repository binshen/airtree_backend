
module.exports = function (app, router, wrap, mongoose) {

    router.get('/list', wrap(function* (req, res, next) {
        var user = req.session.login_user;
        res.render('list_version', { page: "version", user: user });
    }));

    router.get('/upload', wrap(function* (req, res, next) {
        var user = req.session.login_user;
        res.render('upload_version', { page: "version", user: user });
    }));

    app.use('/version', router);
};