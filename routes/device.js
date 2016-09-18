
module.exports = function (app, router, wrap, mongoose) {

    router.get('/list', wrap(function* (req, res, next) {
        res.render('list_device', { page: "device" });
    }));

    app.use('/device', router);
};