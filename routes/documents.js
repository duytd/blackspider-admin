var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Document = require('../models/Document.js');

/* GET /todos listing. */
router.get('/', function(req, res, next) {
    Document.find({categoryId: {'$ne': null }}).populate('urlId').populate('categoryId').exec(function (err, docs) {
    if (err) return next(err);
    res.render('docs', {docs: docs, scripts: [] });
  });
});

module.exports = router;
