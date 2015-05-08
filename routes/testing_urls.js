var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var TestingUrl= require('../models/TestingUrl.js');

/* GET /todos listing. */
router.get('/', function(req, res, next) {
    TestingUrl.find({}).sort({categoryId: 'desc'}).populate('urlId').populate('categoryId').populate('expectedResult').populate('actualResult').exec(function (err, testing_urls) {
    if (err) return next(err);
    res.render('testing_urls', {testing_urls: testing_urls, scripts: [] });
  });
});

module.exports = router;
