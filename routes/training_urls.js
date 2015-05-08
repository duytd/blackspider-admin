var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var TrainingUrl= require('../models/TrainingUrl.js');

/* GET /todos listing. */
router.get('/', function(req, res, next) {
    TrainingUrl.find({}).sort({categoryId: 'desc'}).populate('urlId').populate('categoryId').exec(function (err, training_urls) {
    if (err) return next(err);
    res.render('training_urls', {training_urls: training_urls, scripts: [] });
  });
});

module.exports = router;
