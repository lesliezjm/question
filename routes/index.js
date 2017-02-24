module.exports = function (app, routePath) {
    app.get('/', function (req, res) {
        res.redirect('/users');
    });

    // 配置路由
    app.use('/users', require('./' + routePath + '/users'));
    app.use('/ask', require('./' + routePath + '/ask'));
    app.use('/answer', require('./' + routePath + '/answer'));
    app.use('/category', require('./' + routePath + '/category'));
    app.use('/question', require('./' + routePath + '/question'));
    app.use('/ajax', require('./'+routePath+'/ajax'));

    // 捕获404
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // 处理错误
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
};