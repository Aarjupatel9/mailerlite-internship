var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  var data = {
    'c_name': 'sk_indstries',
    'name': 'sk_nanera',
    'email': 'sagarnanera30@gmail.com'
  }
  res.render('index', { data: data });
});

module.exports = router;
