var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
// var config = require('config-lite');
var response = require('./common/Response');
var routes = require('./routes');
var winston = require('winston');
var expressWinston = require('express-winston');

var app = express();

// session 中间件
app.use(session({
    secret: 'question', // 用来注册session id 到cookie中，相当与一个密钥
    name: 'question', // cookie的name
    cookie: {maxAge: 2592000000},
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        url: 'mongodb://localhost:27017/question',
        autoRemove: 'native'
    })
}));

// 设置模板目录
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎为 jade
app.set('view engine', 'jade');

// 设置网站favicon图标
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// 开启控制台日志
app.use(logger('dev'));

//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 设置全局的Response
app.use(function (req, res, next) {
    response.setResponse(res);
    next();
});

app.use(function (req, res, next) {
    if (req.method == 'GET') {
        console.log("req.method", req.method);
        console.log("req.url", req.url);
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } else {
        next();
    }
});
// 正常请求的日志
/*app.use(expressWinston.logger({
 transports: [
 // new (winston.transports.Console)({
 //   json: true,
 //   colorize: true
 // }),
 new winston.transports.File({
 filename: 'logs/success.log'
 })
 ]
 }));*/

// 路由
routes(app, 'api');

// 错误请求的日志
/*app.use(expressWinston.errorLogger({
 transports: [
 // new winston.transports.Console({
 //   json: true,
 //   colorize: true
 // }),
 new winston.transports.File({
 filename: 'logs/error.log'
 })
 ]
 }));*/

module.exports = app;
