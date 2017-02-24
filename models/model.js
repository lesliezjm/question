/**
 * Created by Leslie on 2016/11/30.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/question', function(err){
  if(err){
    console.log('数据库连接失败:' + err);
  }
  console.log("数据库链接成功");
});
exports.User = mongoose.model('user',require('./user'));
exports.Ask = mongoose.model('ask',require('./ask'));
exports.Answer = mongoose.model('answer',require('./answer'));
exports.Category = mongoose.model('categorys',require('./category'));
exports.Question = mongoose.model('question',require('./question'));