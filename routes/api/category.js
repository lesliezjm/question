/**
 * Created by Leslie on 2017/1/24.
 */
var express = require('express');
var categoryModel = require('../../dal/category');
var router = express.Router();
var Response = require('../../common/Response');

router.post('/getlist', function (req, res, next) {
    categoryModel.getList();
});


module.exports = router;