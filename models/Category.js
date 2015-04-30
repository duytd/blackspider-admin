var mongoose = require('mongoose')
, Schema = mongoose.Schema

var CategorySchema = new mongoose.Schema({
    name: String,
    Pvj: Number
});

module.exports = mongoose.model('Category', CategorySchema);
