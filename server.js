var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const fs = require('mz/fs');

var port = 3000;

var index = require('./routes/index');

var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Static Folder
app.use(express.static(path.join(__dirname, 'client')));  // angular2 stuff
app.use(express.static(path.join(__dirname, 'public')));

// bodyParser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// routes
app.use('/', index);

app.listen(port, function(){
  console.log('Magic happening on port '+port);
});
