/**
 * Created by Leslie on 2016/11/30.
 */
var db = require('../models/model');
var moment = require('moment');
var Response = require('../common/Response');
var utils = require('../common/Utils');
var q = require('q');

/**
 * 提问
 * @param user
 */
exports.ask = function(ask){
  // 验证用户是否登录
  if(!ask.user_id){
    return Response.msg(401, false, '身份验证失败', {});
  }
  // 验证输入不能为空
  if(ask.title == '' || ask.content == '')
    return Response.msg(400, false, '标题或内容不能为空', {});

  // 创建提问
  db.Ask.create(ask, function(err){
    if(err)
      Response.msg(500, false, '提问失败', err);
    // 查找当前提问
    db.Ask.findOne(ask, function(err, doc){
      Response.msg(200, true, '提问成功', doc);
    });
  });
};

/**
 * 获取问题列表
 * @param condition
 */
exports.getList = function(condition){

  db.Ask.find({}, function(err, docs){
    Response.msg(200, true, '获取问题成功', docs);
  }).sort({'created_at':'-1'});
};

exports.getOne = function(condition){
  db.Ask.findOne(condition,function(err, doc){
    return Response.msg(200, true, '获取问题成功', doc);
  });
}