//department表对应model
let DB = require('./common/SQLHelper');

module.exports = {
    getAllDepts:function(callback){
        DB.getRows('department','*',null,null,null,function(err,res){
            callback(err,res);
        })
    }
};