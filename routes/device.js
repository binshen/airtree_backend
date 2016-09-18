
module.exports = function (app, router, wrap, mongoose) {

    router.get('/list', wrap(function* (req, res, next) {
        var user = req.session.login_user;
        res.render('list_device', { page: "device", user: user });
    }));

    app.use('/device', router);
};