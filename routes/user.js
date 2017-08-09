const path = require('path');
const fs = require('fs');

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const formidable = require('formidable');

let user = require('../model/user');
let jsonParser = bodyParser.json();

router.options('/uploadSign',function(req,res){
    //响应 uploadSign 跨域请求询问
    res.send('ok');
});
router.post('/uploadSign',function(req,res){
    let form = formidable.IncomingForm();
    form.encoding='utf-8';
    let folderPath = path.join(__dirname + '/../upload/sign');
    form.uploadDir = folderPath;
    form.keepExtensions = true;
    form.maxFieldsSize = 1024 *1024; //1M
    form.parse(req,function(err1,fields,files){
        //重命名文件
        //console.log(fields,files.file.path);
        let oldPath = files.file.path;
        let fileName = fields.userid + path.extname(oldPath);
        let newPath = folderPath + '\\' + fileName;
        fs.rename(oldPath,newPath,function(err2){
            if(err2) throw err2;
            //改名之后写入数据中
            user.updateUser({'signature':fileName}," userid='" + fields.userid + "'",function(err3,result){
                if(err3)throw err3;
                res.json({'result':1,'msg':'上传图片成功！'})
            })
        })
        //console.log(oldPath,newPath);
        //res.json('error');
    });
});

router.post('/updateUser',jsonParser,function(req,res){
    let userInfo = {
        'username':req.body.username,
        'tel':req.body.tel,
        'department':req.body.department
    };
    let condition = " userid = '" + req.body.userid + "'";
    userInfo.create_time = new Date().toLocaleString();

    user.updateUser(userInfo,condition,function(err,result){
        if(err)throw err;
        if(result.changedRows===1){
            res.json({'result':1,'msg':'用户信息修改成功！'})
        }else{
            res.json({'result':0,'msg':'用户信息修改失败！'})
        }
    })
});

router.post('/updateUserStatus',jsonParser,function(req,res){
    let userInfo = {
        'status':req.body.status
    };
    let condition = " userid = '" + req.body.userid + "'";
    user.updateUser(userInfo,condition,function(err,result){
        if(err)throw err;
        if(result.changedRows===1){
            res.json({'result':1,'msg':'用户状态修改成功！'})
        }else{
            res.json({'result':0,'msg':'用户状态修改失败！'})
        }
    })
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
    user.getUserByUserId(req.query.userid,function(err,result){
        if(err)throw err;
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
module.exports = router;