var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var uuid = require('uuid');
var path = require('../secrets/amazon.json');
AWS.config.loadFromPath('../secrets/amazon.json');
var s3 = new AWS.S3({apiVersion: '2006-03-01'});
console.log(s3);
const fs = require('mz/fs');
var photo = fs.readFileSync('../public/no_canvas_photo.jpg');

var params = {Bucket: 'face-space', Key: 'asdf.jpg', Body: photo};
s3.upload(params, function(err, data) {
  console.log(err, data);
});






























// // const AWS = require('aws-sdk');
// // const Busboy = require('busboy');

// const BUCKET_NAME = "face-space";
// const photo = '../public/no_canvas_photo.jpg';



// // call S3 to retrieve upload file to specified bucket
// var uploadParams = {Bucket: BUCKET_NAME, Key: '', Body: ''};
// var file = photo;

// var fs = require('fs');
// var fileStream = fs.createReadStream(file);
// fileStream.on('error', function(err) {
//   console.log('File Error', err);
// });
// uploadParams.Body = fileStream;


// uploadParams.Key = path[1];

// console.log(uploadParams.Key);

// console.log("adfsdf\n\n\n\n");


// // var path = require('path');
// // uploadParams.Key = path.basename(file);

// // call S3 to retrieve upload file to specified bucket
// s3.upload (uploadParams, function (err, data) {
//   if (err) {
//     console.log("Error", err);
//   } if (data) {
//     console.log("Upload Success", data.Location);
//   }
// });








// // let s3bucket = new AWS.S3({
// //     Bucket: BUCKET_NAME
// // });
// // s3bucket.upload(photo.data, function (err, data) {
// //     if (err) {
// //         console.log('error in callback');
// //         console.log(err);
// //     }
// //     console.log('success');
// //     console.log(data);
// //     });

// // // function uploadToS3(file) {
// // //   let s3bucket = new AWS.S3({
// // //     Bucket: BUCKET_NAME
// // //   });
// // //   s3bucket.upload(params, function (err, data) {
// // //     if (err) {
// // //       console.log('error in callback');
// // //       console.log(err);
// // //     }
// // //     console.log('success');
// // //     console.log(data);
// // //   });
// // // }
// // // module.exports= upload.js;
