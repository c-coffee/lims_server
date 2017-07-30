let express = require('express');
let router = express.Router();
let dept = require('../model/department');

router.get('/',function(req,res){

});

//获取部门信息列表
router.get('/getDeptList',function(req,res){
    console.log('receive get request!');
    dept.getAllDepts(function(err,results){
            if(err) throw err;
            res.json(results);
    })
});


module.exports = router;