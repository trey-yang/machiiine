var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var uuid = require('uuid');

// AWS config
AWS.config.loadFromPath('secrets/amazon.json')

var Rek = new AWS.Rekognition({apiVersion: '2016-06-27'});
var S3 = new AWS.S3({apiVersion: '2006-03-01'});


var faces = ["vince_001.png", "vince_002.png", "vince_003.png", "adam_001.png", "adam_002.png", "adam_003.png"]//, "empty_001.png"];


router.get('/', function(req, res, next) {
  res.render('camtest.html');
});
module.exports = router;
