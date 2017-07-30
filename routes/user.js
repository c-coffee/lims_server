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
router.post('/addUser',function(req,res){
    console.log('ok',req);
});

router.get('/getUserList',function(req,res){

});

router.get('/getUserById',function(req,res){

});

module.exports = router;