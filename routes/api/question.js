/**
 * Created by Leslie on 2017/1/24.
 */
var express = require('express');
var questionModel = require('../../dal/question');
var router = express.Router();
var Response = require('../../common/Response');
router.post('/', function (req, res, next) {
    var condition = {};
    if(req.param(('id'))){
        condition = {_id:req.param('id')}
        questionModel.getOne(condition);
        return ;
    }else if(req.param('name')){
        condition = {cname:req.param('name')}
    }
    questionModel.getList(condition, 20, 'desc');
});

router.post('/getlist', function (req, res, next) {
    var data = req.body;
    questionModel.getList({}, data.limit, data.order);
});

router.post('/create', function (req, res, next) {
    if(req.session.user){
        questionModel.create(req.body);
    }else{
        Response.msg(400, false, '验证失败',null);
    }

})


module.exports = router;