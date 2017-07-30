//数据库操作通用库

let config = require('./dbConfig');
let mysql  = require('mysql');

//建立连接池
let pool = mysql.createPool({
    connectionLimit :   config.connectionLimit,
    host            :   config.host,
    user            :   config.user,
    password        :   config.password,
    database        :   config.database
});

module.exports = {
    //按条件查询表中记录
    getRows:function(tableName,columns,condition,orderColumn,limitCondition,callback){
        let sql = 'select ' + columns + ' from ' + tableName;

        if(condition!==null){
            sql += 'where ' + condition;
        }
        if(orderColumn!==null){
            sql += ' order ' + orderColumn;
        }
        if(limitCondition!==null){
            sql += 'limit ' + limitCondition;
        }
        pool.query(sql,function(err,res){
            console.log(sql);
            if(err){
                console.log('error!');
                console.log('SQLHelper.js->getRows error!');
                throw err;
            }
            console.log('ok!');
            callback(err,res);
        })
    },
    //按条件查询表中记录总数
    getRowsCount:function(tableName,condition,callback){
        let sql='select count(*) from ' + tableName;
        if(condition!==null){
           sql += 'where ' + condition;
        }
        pool.query(sql,function(err,res){
            if(error){
                console.log('SQLHelper.js->getRowsCount error!')
                throw error;
            }
            callback(err,res);
        })
    },
    //防sql注入工具
    escape:function(value){
        return mysql.escape(value);
    }

};