
module.exports = function (app, router, wrap, mongoose) {

    router.get('/list', wrap(function* (req, res, next) {
        var user = req.session.login_user;
        res.render('list_data', { page: "data", user: user });
    }));

    app.use('/data', router);
};