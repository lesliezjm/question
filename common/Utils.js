/**
 * Created by Leslie on 2016/11/30.
 */
var crypto = require('crypto');

function randUtils(){
  var me = this;
  me.source = "abcdefghzklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.~!@#$%^&*()_:<>?";
  me.letter = "abcdefghzklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  me.number = "0123456789";
  me.mark = "-.~!@#$%^&*()_:<>?";

  me.gPwd = function(){
    var range = me.generatePassword(5, me.source);
    var lettval = me.generatePassword(1, me.letter);
    var numval = me.generatePassword(1, me.number);
    var markval = me.generatePassword(1, me.mark);
    var pwd = lettval + numval + markval + range;
    return pwd;
  };

  me.gNickName = function(){
    var range = me.generatePassword(5, me.source);
    var lettval = me.generatePassword(1, me.letter);
    var numval = me.generatePassword(1, me.number);
    var markval = me.generatePassword(1, me.mark);
    var nickname = lettval + numval + markval + range;
    return nickname;
  }

  me.generatePassword = function(length, resource){
    length = length || 32;
    var s = "";
    for(var i = 0; i < length; i++){
      s += resource.charAt(
          Math.ceil(Math.random() * 1000) % resource.length
      );
    }
    return s;
  };
}

function checkEmail(email){
  var emailPat = /^(.+)@(.+)$/;
  var matchArray = email.match(emailPat);
  if(matchArray == null){
    return false;
  }
  return true;
}

function setPassword(password){
  password = password.toString();
  var token = 'zhaodashen';
  var SecrectKey = token;
  var Signture = crypto.createHmac('sha1', SecrectKey);
  Signture.update(password);
  return Signture.digest().toString('hex');
};

module.exports = {
  getNickname: new randUtils().gNickName,
  checkEmail: checkEmail,
  setPassword: setPassword
};

String.prototype.trim = function(){
  return this.replace(/(^\s*)|(\s*$)/g, '');
};
