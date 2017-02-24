/**
 * Created by Leslie on 2016/11/30.
 */
exports.myResponse = {};

exports.msg = function(statucCode, result, message, data){
  exports.myResponse.status(statucCode).json({
    statusCode: statucCode,
    result: result,
    msg: message,
    data: data
  })
};


exports.setResponse = function(res){
  exports.myResponse = res;
};







