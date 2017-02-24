var express = require('express');
var answerModel = require('../../dal/answer');
var router = express.Router();
var Response = require('../../common/Response');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Ask'});
});

router.post('/create', function (req, res, next) {
    if(req.session.user){
        var answer = req.body;
        answer.user_id = req.session.user._id;
        answerModel.create(answer);
    }else{
        Response.msg(400, false, '验证失败',null);
    }

});

router.post('/getlist', function (req, res, next) {
    answerModel.getList(req.body);
});
module.exports = router;
