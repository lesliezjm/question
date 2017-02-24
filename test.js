/**
 * Created by Leslie on 2016/12/6.
 */

var express = require('express');
var mongoose = require('mongoose');
var moment = require('moment');
mongoose.connect('mongodb://127.0.0.1:27017/question', function(err){
  if(err){
    console.log('数据库连接失败:' + err);
  }
  console.log("数据库链接成功");
});
var app = new express();

var userSchema = new mongoose.Schema({
  username: {type: String},
  password: {type: String}
});

var articleSchema = new mongoose.Schema({
  title: {type: String, required:true},
  content: {type: String, required: true},
  user_id: {type: mongoose.Schema.ObjectId,  ref: 'user'}
});

var categorySchema = new mongoose.Schema({
  name: {type: String}
})

var userModel = mongoose.model('user', userSchema);
var articleModel = mongoose.model('article', articleSchema);
var categoryModel = mongoose.model('category', categorySchema, 'category');

app.get('/', function(req, res, next){
  // articleModel.find({}, function(err, asks){
  //   if(err)
  //     throw err;
  //   res.send(asks);
  // }).populate('user_id','_id username password'); // populate(链接字段名, '需要查询的字段')

    categoryModel.find({}, function (err, docs) {
        res.send(docs)
    })
});

app.listen(3001, function(err){
  if(err)
    throw err;
  console.log('myserver is start');
});