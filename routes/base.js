let express = require('express');
let mysql = require('mysql');
let router = express.Router();

let conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456'
});

router.get('/',function(req,res){

});

//获取部门信息列表
router.get('/getDeptList',function(req,res){

});


module.exports = router;