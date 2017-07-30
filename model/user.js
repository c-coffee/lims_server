//User表对应model

let DB = require('./common/SQLHelper');

module.exports = {
    getAllUsers:function(callback){
        DB.getRows('user','*',null,null,null,function(err,res){
            callback(err,res);
        })
    },
    addUser:function(userInfo,callback){

    }
};