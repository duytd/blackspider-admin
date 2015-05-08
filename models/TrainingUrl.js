var mongoose = require('mongoose')
, Schema = mongoose.Schema;

var Url = require('../models/Url.js');
var Category = require('../models/Category.js');

var TrainingUrlSchema = new mongoose.Schema({
    urlId:  { type: Schema.ObjectId, ref: 'Url' },
    categoryId: { type: Schema.ObjectId, ref: 'Category' },
    documentId: { type: Schema.ObjectId, ref: 'Document' }
}, { collection: 'training_urls' });

module.exports = mongoose.model('TrainingUrl', TrainingUrlSchema);
