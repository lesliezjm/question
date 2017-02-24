/**
 * Created by Leslie on 2016/11/30.
 */
var mongoose = require('mongoose');
var moment = require('moment');

var Category = new mongoose.Schema({
  name: {type: String}
});

module.exports = Category;