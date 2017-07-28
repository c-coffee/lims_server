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

router.get('/getList',function(req,res){

});

module.exports = router;