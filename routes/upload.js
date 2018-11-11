var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var uuid = require('uuid');

AWS.config.loadFromPath('secrets/amazon.json')


var s3 = new AWS.S3({apiVersion: '2006-03-01'});

//console.log(s3);

const fs = require('mz/fs');
//var photo = fs.readFileSync('./public/no_canvas_photo.jpg');

router.post('/upload', function(req, res, next) {
  var photo = req;
  // make the request
  var nm = Math.floor((Math.random() * 100000) + 1)+'.jpg';

  var params = {Bucket: 'face-space', Key: nm, Body: photo};
  s3.upload(params, function(err, data) {
    console.log(err, data);
  });
});


router.get('/', function(req, res, next) {
  res.send('testing');
});

module.exports = router;
