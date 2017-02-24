/**
 * Created by Leslie on 2016/11/30.
 */
var mongoose = require('mongoose');
var moment = require('moment');

var User = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String},
    nickname: {type: String},
    truename: {type: String},
    created_at: {type: Date, default: moment().format('YYYY-MM-DD hh:mm:ss')},
    updated_at: {type: Date, default: moment().format('YYYY-MM-DD hh:mm:ss')},
    last_login_time: {type: Date},
    status: {type: Number, default: 1}
});

module.exports = User;