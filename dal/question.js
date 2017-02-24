/**
 * Created by Leslie on 2017/1/24.
 */
var db = require('../models/model');
var moment = require('moment');
var Response = require('../common/Response');
var utils = require('../common/Utils');
var q = require('q');


/**
 * 获取分类列表
 * @param condition
 */
exports.getList = function (condition) {
    db.Question.find(condition, function (err, docs) {
        Response.msg(200, true, '获取成功', docs);
    }).populate('user_id', 'truename').sort({"create_time": -1});
};

exports.getOne = function (condition) {
    db.Question.findOne(condition, function (err, doc) {
        Response.msg(200, true, '获取成功', doc);
    })
};

exports.create = function (question) {
    if (!question.user_id) {
        Response.msg(400, false, '用户验证失败', null);
        return;
    }
    if (question.title == '' || question.content == '') {
        Response.msg(400, false, '标题或内容不能为空', null);
        return;
    }
    db.Question.create(question, function (err, doc) {
        if (err)
            Response.msg(200, false, '提问失败', doc);
        else
            Response.msg(200, true, '提问成功', doc);
    })
};