/**
 * Created by Leslie on 2016/11/30.
 */
var mongoose = require('mongoose');
var moment = require('moment');

var Ask = new mongoose.Schema({
  user_id:{type: mongoose.Schema.ObjectId,  ref: 'user'},
  title: {type: String, required:true},
  tag: {type: String},
  content: {type: String, required: true},
  created_at: {type: Date, default:  moment().format('YYYY-MM-DD hh:mm:ss')},
  updated_at: {type: Date, default:  moment().format('YYYY-MM-DD hh:mm:ss')},
  author: {type: String, default: "醉忆是杭州"},
  reply: {type: Number, default: 100},
  watcher: {type: Number,default: 1000},
  avatar: {type: String, default: "img/avatar.jpg"},
  picture: {type: String, default: "img/a1.jpg"}
});

module.exports = Ask;