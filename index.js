let express = require('express');
let user = require('./routes/user');
let base = require('./routes/base');

let app = express();

//设置允许跨域访问，改成同源版本时去掉。
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:8080');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    // console.log('all');
    next();
});

app.use('/base',base);
app.use('/user',user);


app.listen(3333);