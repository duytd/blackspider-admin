var mongoose = require('mongoose')
, Schema = mongoose.Schema

var Url = require('../models/Url.js');

var EdgeSchema = new mongoose.Schema({
    vertexes: [{ type: Schema.ObjectId, ref: 'Url' }]
});

module.exports = mongoose.model('Edge', EdgeSchema);