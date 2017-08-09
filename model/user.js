//User表对应model

let DB = require('./common/SQLHelper');

module.exports = {
    getUserList:function(condition,orderColumn,limitCondition,callback){
        DB.getRows('user','*',null,null,null,function(err,res){
            callback(err,res);
        })
    },
    getUserByUserId:function(userId,callback){
        DB.getRows('user','*','userid=' + DB.escape(userId),null,null,function(err,res){
            callback(err,res);
        });
    },
    getUserCount:function(condition,callback){
        DB.getRowsCount('user',condition,function(err,res){
            callback(err,res);
        })
    },
    updateUser:function(userInfo,condition,callback){
        DB.updateRow('user',userInfo,condition,function(err,res){
            callback(err,res);
        })
    },
    addUser:function(userInfo,callback){
        DB.insertRow('user',userInfo,function(err,res){
            callback(err,res);
        });
    }
};