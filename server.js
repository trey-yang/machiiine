var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const fs = require('mz/fs');

var port = 3000;

var index = require('./routes/index');
var upload = require('./routes/upload');
var cam = require('./routes/camtest');

var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Static Folder
app.use('/static', express.static(path.join(__dirname, 'public')));

// bodyParser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Routes
app.use('/', index);
app.use('/cam', cam);
app.post('/cam', cam);
app.post('/upload', upload);

app.listen(port, function(){
  console.log('Magic happening on port '+port);
});
