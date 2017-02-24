/**
 * Created by Leslie on 2017/2/8.
 */
var express = require('express');
var categoryModel= require('../../dal/category');
var router = express.Router();
var Response = require('../../common/Response');

router.post('/loadTags', function (req, res, next) {
    var word = req.body.word;
    categoryModel.loadOne(word, function (tag) {
        var newData = [];
        tag.forEach(function (item) {
            newData.push({id:item._id, text: item.name})
        });
        Response.msg(200, true, '获取成功', newData);
    })
});

module.exports = router;