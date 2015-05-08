var mongoose = require('mongoose')
, Schema = mongoose.Schema;

var Url = require('../models/Url.js');
var Category = require('../models/Category.js');

var TestingUrlSchema = new mongoose.Schema({
    urlId:  { type: Schema.ObjectId, ref: 'Url' },
    expectedResult: { type: Schema.ObjectId, ref: 'Category' },
    actualResult: { type: Schema.ObjectId, ref: 'Category' },
}, { collection: 'testing_urls' });

module.exports = mongoose.model('TestingUrl', TestingUrlSchema);
