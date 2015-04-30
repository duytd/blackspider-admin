var express = require('express');
var router = express.Router();

/* GET /todos listing. */
router.get('/', function(req, res, next) {
    res.render('home', {scripts: [] });
});

module.exports = router;
