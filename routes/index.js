var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  res.send('TEST INDEX PAGE');
});

module.exports = router;
