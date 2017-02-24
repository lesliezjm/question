var express = require('express');
var userModel = require('../../dal/user');
var router = express.Router();
var Response = require('../../common/Response');

/* GET users listing. */
router.get('/', function (req, res, next) {
    // res.send('users/');
    res.render('index', {title: 'Express'});
});

router.post('/login', function (req, res, next) {
    var user = req.body

    var promise = undefined;
    if ((promise = userModel.login(user)) != undefined) {
        promise.then(function (doc) {
            req.session.user = doc;
            Response.msg(200, true, '登录成功', doc);
        }).finally(function () {
            res.end();
        });
    }
});

router.post('/register', function (req, res, next) {
    userModel.register(req.body);
});

router.post('/islogin', function (req, res, next) {
    if (req.session.user) {
        Response.msg(200, true, '此用户已登录', req.session.user);
    } else {
        Response.msg(200, false, '此用户未登录', null);
    }
});

router.post('/logout', function (req, res, next) {
    if (req.session.user) {
        req.session.user = null;
        Response.msg(200, true, '此用户已退出登录', null);
    }
});

module.exports = router;
