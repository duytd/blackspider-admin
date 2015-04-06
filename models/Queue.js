var mongoose = require('mongoose')
, Schema = mongoose.Schema

var QueueSchema = new mongoose.Schema({
    anchor: String
});

module.exports = mongoose.model('Queue', EdgeSchema);