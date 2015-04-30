var mongoose = require('mongoose')
, Schema = mongoose.Schema;

var Category = require('../models/Category.js');

var DocumentSchema = new mongoose.Schema({
    urlId: { type: Schema.ObjectId, ref: 'Url' },
    categoryId: { type: Schema.ObjectId, ref: 'Category' },
    tokenized: Boolean 
});

module.exports = mongoose.model('Document', DocumentSchema);
