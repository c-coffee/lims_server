let express = require('express');
let user = require('./routes/user');

let app = express();
app.use('/user',user);

app.listen(3333);