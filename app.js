var mongoose = require('mongoose');
var express = require('express')
var app = express()
var urls = require('./routes/urls');
var edges = require('./routes/edges');
var docs = require('./routes/documents');
var pages = require('./routes/pages');

app.set('views', './views')
app.set('view engine', 'jade')


app.use('/', pages);
app.use('/urls', urls);
app.use('/edges', edges);
app.use('/documents', docs);
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// connect db
mongoose.connect('mongodb://localhost/blackspider', function(err) {
    if(err) {
        console.log('Connection error', err);
    } else {
        console.log('Connection successful');
    }
});

// server
var server = app.listen(9000, function (err) {
 if(err) {
        console.log('Starting server error', err);
    }
    else {
        var host = server.address().address
        var port = server.address().port
        console.log('Example app listening at http://%s:%s', host, port)
    }

})
