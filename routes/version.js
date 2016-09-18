
module.exports = function (app, router, wrap, mongoose) {

    router.get('/list', wrap(function* (req, res, next) {
        res.render('list_version', { page: "version" });
    }));

    router.get('/upload', wrap(function* (req, res, next) {
        res.render('upload_version', { page: "version" });
    }));

    app.use('/version', router);
};