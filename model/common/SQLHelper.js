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
    //修改记录
    updateRow:function(tableName,rowInfo,condition,callback){
        let sql = 'update ' + tableName + ' set ? ';
        if(condition !== null){
            sql += ' where ' + condition;
        }
        pool.query(sql,rowInfo,function(err,res){
            if(err){
                console.log('SQLHelper.js->updateRow error!');
                throw err;
            }
            callback(err,res);
        });
    },
    //添加记录
    insertRow:function(tableName,rowInfo,callback){
        let sql = 'insert into ' + tableName + ' Set ?';
        pool.query(sql,rowInfo,function(err,res){
            if(err){
                console.log('SQLHelper.js->insertRow error!');
                throw err;
            }
            callback(err,res);
        })
    },
    //按条件查询表中记录
    getRows:function(tableName,columns,condition,orderColumn,limitCondition,callback){
        let sql = 'select ' + columns + ' from ' + tableName;

        if(condition!==null){
            sql += ' where ' + condition;
        }
        if(orderColumn!==null){
            sql += ' order ' + orderColumn;
        }
        if(limitCondition!==null){
            sql += ' limit ' + limitCondition;
        }
        // console.log(sql);
        pool.query(sql,function(err,res){
            if(err){
                console.log('SQLHelper.js->getRows error!');
                throw err;
            }
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
            if(err){
                console.log('SQLHelper.js->getRowsCount error!');
                throw err;
            }
            result = {'total':res.length};
            callback(err,result);
        })
    },
    //防sql注入工具
    escape:function(value){
        return mysql.escape(value);
    }

};