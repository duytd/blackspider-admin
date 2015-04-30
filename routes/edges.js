var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async')

var Url = require('../models/Url.js');
var Edge = require('../models/Edge.js');

/* GET /todos listing. */
router.get('/', function(req, res, next) {
    Edge.find({}).populate('source').populate('target').exec(function(err, edges) {
        if (err) return next(err);
        res.render('edges', {
            edges: edges, scripts: [] 
        });
    });
});

router.get('/graph.json', function(req, res, next) {
    Edge.find({}).populate('source','_id').populate('target','_id').exec(function(err, edges) {
        if (err) return next(err);
        Url.find({}).select('absPath').exec(function(err, urls) {
            res.json({
                "nodes": urls,
                "links": edges
            });
        })
    });
});

router.get('/graph', function(req, res, next) {
    res.render('graph', {
        scripts: ['/javascripts/graph.js']
    });
});

module.exports = router;