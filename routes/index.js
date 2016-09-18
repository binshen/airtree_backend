
module.exports = function (app, router, wrap, mongoose) {

  router.get('/', wrap(function* (req, res, next) {
    res.render('index');
  }));

  app.use('/', router);
};