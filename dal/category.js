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
exports.getList = function(){
    db.Category.find({}, function(err, docs){
        Response.msg(200, true, '获取成功', docs);
    });
};

exports.loadOne = function (word, callback) {
    db.Category.find({name:{$regex: word}}, function (err, docs) {
        callback(docs)
    })
};