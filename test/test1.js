const mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
  port: "3306",
});

var q = new Date();
// var date  = new Date(q.getTime() + (3600000*5.5));
var date = new Date();
var d =
  date.toISOString().split("T")[0] + " " + date.toTimeString().split(" ")[0];

// var sql = "insert into `mhk`(`time`) values('"+d+"')";
// con.query(
//     sql, function (err, result, fields) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(result);
//         }
//     }
// )

var sql = "select * from `mhk`";
con.query(sql, function (err, result, fields) {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
    for (let i = 0; i < result.length; i++) {
        date = result[i].time;
        console.log(date);
        
      var d = date.getTime();
    console.log(d);
    
    }
  }
});
