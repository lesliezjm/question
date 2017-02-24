var express = require('express');
var askModel = require('../../dal/ask');
var router = express.Router();
var Response = require('../../common/Response');

/* GET users listing. */
router.get('/', function(req, res, next){
  res.render('index', {title: 'Ask'});
});

router.post('/', function(req, res, next){
  var ask = req.body;
  if(req.session.user)
    ask.user_id = req.session.user._id;
  askModel.ask(ask);
});

router.get('/list',function(req, res, next){
  askModel.getList(req.query);
});

router.get('/get',function(req, res, next){
  askModel.getOne(req.query);
});

module.exports = router;
