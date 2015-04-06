var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async')

var Url = require('../models/Url.js');
var Edge = require('../models/Edge.js');

/* GET /todos listing. */
router.get('/', function(req, res, next) {
  Edge.find({}).populate('vertexes', 'absPath').select('vertexes').exec(function (err, edges) {
    if (err) return next(err);    
    		res.render('edges', {edges: edges});
  });
});

router.get('/graph.json', function(req, res, next) {
  Edge.find({}).populate('vertexes', '_id').select('-_id vertexes').exec(function (err, edges) {
    if (err) return next(err);    
    		Url.find({}).select('absPath').exec(function(err, urls) {
    			res.json({"nodes": urls, "links":edges});
    		})
  });
});

router.get('/graph', function(req, res, next) {
    	res.render('graph', {scripts: ['/javascripts/graph.js']});
});

module.exports = router;