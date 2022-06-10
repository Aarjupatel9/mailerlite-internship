const express = require("express");
const os = require("os");
const path = require("path");
const dotenv = require("dotenv");
var nodemailer = require("nodemailer");
var navigator = require("navigator");
const cookieParser = require("cookie-parser");
const session_storage = require("node-sessionstorage");
const { NULL } = require("mysql/lib/protocol/constants/types");

var bodyParser = require("body-parser");
var urlencodedparser = bodyParser.urlencoded({ extended: false });

const authController = require("../controllers/auth");
var con = require("../module/mysqlconn");
con.connect(function (err) {
  if (err) console.log(err);
});




const router = express.Router();



module.exports = router;
