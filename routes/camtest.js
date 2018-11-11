var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var uuid = require('uuid');

// AWS config
AWS.config.loadFromPath('../secrets/amazon.json');

var Rek = new AWS.Rekognition({apiVersion: '2016-06-27'});
var S3 = new AWS.S3({apiVersion: '2006-03-01'});

// detect faces in S3 bucket
var faces = ["vince_001.png", "vince_002.png", "vince_003.png", "adam_001.png", "adam_002.png", "adam_003.png"]//, "empty_001.png"];

var face = faces[0];
var param_detect = {
  "Image": {
    "S3Object": {
    "Bucket": "face-space",
    "Name": face }
  },
  };

Rek.detectFaces(param_detect, function(err, response) {
  if (err) console.log(err, err.stack); // an error occurred
  temp = JSON.parse(JSON.stringify(response, null, '\t'));
  //temp = JSON.stringify(response, null, '\t');
  //console.log(temp);
  console.log(face + " - confidence: "+temp.FaceDetails[0].Confidence);
});

// compare faces in S3 bucket
var param_compare = {
  "SimilarityThreshold": 0,
  "SourceImage": {
      "S3Object": {
         "Bucket": "face-space",
         "Name": faces[5]
      }
   },
   "TargetImage": {
      "S3Object": {
        "Bucket": "face-space",
        "Name": faces[4],
      }
   }
  };

Rek.compareFaces(param_compare, function(err, response) {
  if (err) console.log(err, err.stack); // an error occurred
  temp = JSON.parse(JSON.stringify(response, null, '\t'));
  console.log("Similarity of faces: "+temp.FaceMatches[0].Similarity);
});

/*
router.get('/', function(req, res, next) {
  res.render('camtest.html');
});

module.exports = router;
*/
