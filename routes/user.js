let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');

let user = require('../model/user');

let jsonParser = bodyParser.json();

router.get('/',function(req,res){

});
router.post('/addUser',jsonParser,function(req,res){
    let userInfo = req.body;
    console.log(userInfo);
    user.getUserByUserId(userInfo.userid,function(err1,result1){
        if(err1) throw err1;

        //todo 判断是否有userid相同的用户，返回错误信息。否则，完成添加工作。
        if(result1.length>0){
            //有同userid用户存在，返回错误信息
            res.json({'result':0,'msg':'该用户已存在！'})
        }else{
            //没用同userid用户存在，正常插入数据，并返回成功信息
            user.addUser(userInfo,function(err2,result2){
                if(err2) throw err2;

                //插入数据，并返回成功信息
                res.json({'result':1,'msg':'用户录入成功！'})
            });

        }

    });
});

router.get('/getUserByUserId',function(req,res){
    console.log(req.query.userid);
    user.getUserByUserId(req.query.userid,function(err,result){
        if(err)throw err;
        console.log(result);
        res.json(result);
    });
});

router.get('/getUserList',function(req,res){
    //需要获取记录总条数
    user.getUserCount(null,function(err1,result1){
        if(err1) throw err1;
        //console.log(result1); //等待最后传回
        //获取当前页中记录信息
        let pageSize = parseInt(req.query.pageSize) ;
        let currentPage  = parseInt(req.query.currentPage);
        let start = (currentPage-1)*pageSize;
        let limit = start + ' ' + pageSize;
        user.getUserList(null,null,limit,function(err2,result2){
            //console.log(result2);
            //todo 打包result1记录总数 和 result2 当前页记录信息, 发送至客户端
            let data = {
                'total':result1.total,
                'users':result2
            };
            res.json(data);
        })

    });

});

router.get('/getUserById',function(req,res){

});

module.exports = router;