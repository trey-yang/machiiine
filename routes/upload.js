var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var uuid = require('uuid');

AWS.config.loadFromPath('secrets/amazon.json')

var S3 = new AWS.S3({apiVersion: '2006-03-01'});
var Rek = new AWS.Rekognition({apiVersion: '2016-06-27'});

//console.log(s3);

const fs = require('mz/fs');
//var photo = fs.readFileSync('./public/no_canvas_photo.jpg');

router.post('/upload', function(req, res, next) {
  var photo = req;
  // make the request
  var nm = Math.floor((Math.random() * 100000) + 1)+'.png';
  var words;
  var params = {Bucket: 'face-space', Key: nm, Body: photo};
  S3.upload(params, function(err, data) {

      var param_compare = {
         "CollectionId": "face-space",
         "FaceMatchThreshold": 0,
         "Image": {
            "S3Object": {
               "Bucket": "face-space",
               "Name": nm,
            }
         },
      };



      Rek.searchFacesByImage(param_compare, function(err, response) {
        if (err) console.log(err, err.stack); // an error occurred
        temp = JSON.parse(JSON.stringify(response, null, '\t'));
        words = "This face matches with: "+temp.FaceMatches[0].Face.ExternalImageId+" with a confidence of (%): "+temp.FaceMatches[0].Similarity;
        console.log(response);
        res.render('result.ejs', {
           words: words,
        });
      });

  });

});


router.get('/', function(req, res, next) {
  res.send('testing');
});

module.exports = router;
