var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Url = require('../models/Url.js');

/* GET /todos listing. */
router.get('/', function(req, res, next) {
  Url.find(function (err, urls) {
    if (err) return next(err);
    res.render('urls', {urls: urls });
  });
});

module.exports = router;
