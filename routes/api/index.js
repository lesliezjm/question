var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({ title: 'Express' });
  // myRespone(200,true,'',{});
});

module.exports = router;