var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/dimension/meta', function(req, res) {
    res.render('dimension/meta')
})

module.exports = router;
