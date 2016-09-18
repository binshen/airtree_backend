
module.exports = function (app, router, wrap, mongoose) {

    var Admin = mongoose.model('Admin');

    router.get('/forget_psw', wrap(function* (req, res, next) {
        res.render('index');
    }));

    router.get('/register', wrap(function* (req, res, next) {
        res.render('register');
    }));

    app.use('/user', router);
};