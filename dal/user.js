/**
 * Created by Leslie on 2016/11/30.
 */
var db = require('../models/model');
var moment = require('moment');
var Response = require('../common/Response');
var utils = require('../common/Utils');
var q = require('q');

/**
 * 注册用户
 * @param user
 */
exports.register = function (user) {
    var defer = q.defer();
    // 验证2次密码是否一致
    if (user.password.toString().trim() != user.password2.toString().trim()) {
        return Response.msg(401, false, '二次密码不一致', {});
    }
    var promise = db.User.findOne({email: user.email}).then(function (doc) {
        if (doc) {
            Response.msg(401, false, '邮箱已存在！', {});
            return promise.reject();
        }
    }).then(function () {
        user.nickname = user.email.split("@")[0] + utils.getNickname(); // 自动生成昵称
        user.password = utils.setPassword(user.password); // 密码加密
        return db.User.create(user);
    }).then(function () {
        db.User.findOne({email: user.email}, function (err, doc) {
            if (doc)
                Response.msg(200, true, '注册成功！', doc);
            return promise.resolve();
        })
    });
};

exports.login = function (user) {
    // 验证邮箱和密码是否为空
    if (user.email == '' || user.password == '') {
        return Response.msg(400, false, '用户名密码不能为空', {});
    }

    // 验证邮箱
    if (!utils.checkEmail(user.email)) {
        return Response.msg(400, false, '邮箱格式不正确', {});
    }

    // 登录
    var deferd = q.defer();
    db.User.findOne({email: user.email, password: utils.setPassword(user.password)}, function (err, doc) {
        if (doc) {
            updatecol = {$set: {last_login_time: moment().format('YYYY-MM-DD hh:mm:ss')}};
            db.User.update(doc, updatecol, function (err) {
                if (err) {
                    Response.msg(400, false, '更新最后登录时间出错', {});
                    return deferd.reject('更新最后登录时间出错');
                }
            });
            return deferd.resolve(doc);
        } else {
            Response.msg(400, false, '用户名或密码不正确', {});
            return deferd.reject('用户名或密码不正确');
        }
    });
    return deferd.promise;
};


/**
 * 查找用户
 * @param user
 * @returns {r.promise|promise|*}
 */
exports.findOne = function (user) {
    // 验证
    if (user.email == '' || user.password == '') {
        return Response.msg(401, false, '邮箱或密码不能为空', {});
    }
    if (!utils.checkEmail(user.email)) {
        return Response.msg(401, false, '邮箱不合法', {});
    }

    var defer = q.defer();
    // 数据库操作
    db.User.findOne(user, function (err, docs) {
        if (err) {
            Response.msg(500, false, '非法操作', {});
            defer.reject();
        } else {
            if (docs) {
                defer.resolve(docs);
            }
            else {
                Response.msg(400, false, '登陆失败', {});
                defer.reject();
            }
        }
    });
    return defer.promise;
};

