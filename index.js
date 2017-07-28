let express = require('express');
let user = require('./routes/user');
let base = require('./routes/base');

let app = express();
app.use('/base',base);
app.use('/user',user);


app.listen(3333);