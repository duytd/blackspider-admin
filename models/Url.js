var mongoose = require('mongoose');

var UrlSchema = new mongoose.Schema({
  absPath: String,
  rootUrl: Boolean,
  downloaded: Boolean,
  parseTime: Date,
});

UrlSchema.statics.getUrlById = function getUrlById(id, callback) {
	this.findOne( {"_id": id }, function (err, url) {
		if (err) {
	      callback(err, null);
	    } else {
	      callback(null, url);
	    }
	});
}

module.exports = mongoose.model('Url', UrlSchema);
