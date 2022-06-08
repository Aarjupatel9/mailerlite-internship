const mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mailerlite",
  port: "3306",
});

module.exports = con;