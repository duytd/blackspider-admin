var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var TestingUrl= require('../models/TestingUrl.js');

/* GET /todos listing. */
router.get('/', function(req, res, next) {
    TestingUrl.find({}).sort({categoryId: 'desc'}).populate('urlId').populate('categoryId').populate('expectedResult').populate('actualResult').exec(function (err, testing_urls) {
    if (err) return next(err);
    var count = 0;
    var classifiedCount = 0;
    for (var i=0 ; i< testing_urls.length; i++) {
     if (testing_urls[i].actualResult != null) {
       classifiedCount++;
      if (testing_urls[i].expectedResult.name == testing_urls[i].actualResult.name) {
        count++;
      }
     }
    }
    res.render('testing_urls', {testing_urls: testing_urls, count: count, classifiedCount: classifiedCount, scripts: [] });
  });
});

module.exports = router;
