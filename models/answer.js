/**
 * Created by Leslie on 2016/11/30.
 */
var mongoose = require('mongoose');
var moment = require('moment');

var Answer = new mongoose.Schema({
  user_id:{type: mongoose.Schema.ObjectId,  ref: 'user'},
  question_id: {type:mongoose.Schema.ObjectId, ref:'question'},
  content: {type: String, required: true},
  created_at: {type: Date, default:  moment().format('YYYY-MM-DD hh:mm:ss')},
  updated_at: {type: Date, default:  moment().format('YYYY-MM-DD hh:mm:ss')},
});

module.exports = Answer;