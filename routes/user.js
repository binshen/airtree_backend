
module.exports = function (app, router, wrap, mongoose) {

    var Admin = mongoose.model('Admin');

    router.post('/login', wrap(function* (req, res, next) {
        var username = req.body.username;
        var password = req.body.password;
        var admin = yield Admin.findOne({username: username, password: password}).exec();
        if(admin != null) {
            req.session.login_user = admin;
            return res.status(200).json({ success:true });
        } else {
            return res.status(200).json({ success:false });
        }
    }));

    router.get('/logout', wrap(function* (req, res, next) {
        req.session.destroy();
        res.render('index');
    }));

    router.get('/forget_psw', wrap(function* (req, res, next) {
        res.render('index');
    }));

    router.get('/register', wrap(function* (req, res, next) {
        res.render('register');
    }));

    app.use('/user', router);
};