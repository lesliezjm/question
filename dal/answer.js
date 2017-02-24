/**
 * Created by Leslie on 2016/11/30.
 */
var db = require('../models/model');
var Response = require('../common/Response');
var utils = require('../common/Utils');
var q = require('q');

exports.create = function (answer) {
    if (answer.content == '')
        return Response.msg(200, false, '回答不能为空', {});

    db.Answer.create(answer, function (err) {
        if (err)
            return Response.msg(400, false, '回答失败', {});

        db.Answer.findOne(answer).exec(function (ans) {
            db.Question.update({_id: answer.question_id}, {$inc: {answer_num: 1}}, function(err){
                return Response.msg(200, true, '回答成功', ans);
            });
        });
    });
};

exports.getList = function (condition) {
    if (!condition.question_id || condition.question_id == '') {
        return Response.msg(500, false, '问题id不能为空', {});
    }
    console.log(condition);
    db.Answer.find(condition, function (err, answers) {
        return Response.msg(200, true, '获取回答成功', answers);
    }).populate('user_id', 'truename').sort({_id: '-1'});
};