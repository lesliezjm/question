/**
 * Created by Leslie on 2016/11/30.
 */
var mongoose = require('mongoose');
var moment = require('moment');

var Question = new mongoose.Schema({
    user_id: {type: mongoose.Schema.ObjectId, ref: 'user'},
    cname: {type: Array},
    title: {type: String, required: true},
    content: {type: String, required: true},
    answer_num: {type: Number, default: 0},
    is_show: {type: Number, default: 1},
    create_time: {type: Date, default: moment().format('YYYY-MM-DD hh:mm:ss')},
    update_time: {type: Date, default: moment().format('YYYY-MM-DD hh:mm:ss')}
});

module.exports = Question;