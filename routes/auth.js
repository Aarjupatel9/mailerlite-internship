const express = require('express');
const authController = require('../controllers/auth');

var bodyParser = require("body-parser");
var urlencodedparser = bodyParser.urlencoded({ extended: false });

const router = express.Router();
          
router.post('/signup',urlencodedparser, authController.signup );

router.post('/login',urlencodedparser, authController.login );

router.get('/logout', authController.logout );

module.exports = router;