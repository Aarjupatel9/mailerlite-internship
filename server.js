const express = require("express");
const path = require("path");
const mysql = require("mysql");
const request = require("request");
const { name } = require("ejs");
const res = require("express/lib/response");
const cookieParser = require("cookie-parser");
// const session = require("express-session");
var nodemailer = require("nodemailer");
const session_storage = require("node-sessionstorage");
const { NULL } = require("mysql/lib/protocol/constants/types");

port = process.env.port || 8080;
const app = express();
const srcpath = path.join(__dirname, "src");
const errorfilespath = path.join(__dirname, "errorfiles");
const editor = path.join(__dirname, "text-editor");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

function send_email_of_campaigns(data) {
  console.log("send email  function inside");
  //fetch the subscribers email from database
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test_db",
  });
  // var con = require("./module/mysqlconn");
  var name, email, c_name;
  var table_name = "s_b_of_" + data.email;
  console.log("table name is : ", table_name);
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "SELECT * FROM `" + table_name + "`",
      function (err, result, fields) {
        if (err) {
          throw err;
        } else {
          let i = 0;
          for (let i = 0; i < result.length; i++) {
            email = result[i].email;
            console.log("subscriber's email id is : ", email);

            //sending email to subscribers
            var transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "travelagency3111@gmail.com",
                pass: "ovuecqzzniieiynd",
              },
            });

            var mailOptions = {
              from: "travelagency3111@gmail.com",
              to: `${email}`,
              subject: `${data.subject}`,
              text: `${data.email_body}`,
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
          }
        }
      }
    );
  });
}

app.get("/text-editor", (req, res) => {
  res.sendFile(`${editor}/editor.html`);
});

app.get("/", (req, res) => {
  res.render("home/home");
  // res.sendFile(`${srcpath}/home.html`);
});
app.get("/dashboard", (req, res) => {
  res.sendFile(`${srcpath}/dashboard.html`);
});

app.get("/campaigns/outbox", (req, res) => {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test_db",
  });
  // var con = require("./module/mysqlconn");
  var name, email, c_name;
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "SELECT * FROM subscriber_details",
      function (err, result, fields) {
        if (err) {
          throw err;
        } else {
          name = result[0].firstname + " " + result[0].lastname;
          email = result[0].email;
          c_name = result[0].companyname;
          const data = {
            name: `${name}`,
            email: `${email}`,
            c_name: `${c_name}`,
          };
          // console.log(data);
          res.render("campaigns/outbox", { data });
        }
      }
    );
  });
});

app.get("/campaigns/create", (req, res) => {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test_db",
  });
  // var con = require("./module/mysqlconn");
  var name, email, c_name;
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "SELECT * FROM subscriber_details",
      function (err, result, fields) {
        if (err) {
          throw err;
        } else {
          name = result[0].firstname + " " + result[0].lastname;
          email = result[0].email;
          c_name = result[0].companyname;
          const data = {
            name: `${name}`,
            email: `${email}`,
            c_name: `${c_name}`,
          };
          // console.log(data);
          res.render("campaigns/create", { data });
        }
      }
    );
  });
});

app.get("/campaigns/user/edit/", (req, res) => {
  console.log(req.query);
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test_db",
  });
  // var con = require("./module/mysqlconn");
  var name, email, c_name;
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "SELECT * FROM subscriber_details",
      function (err, result, fields) {
        if (err) {
          throw err;
        } else {
          name = result[0].firstname + " " + result[0].lastname;
          email = result[0].email;
          c_name = result[0].companyname;
          const data = {
            name: `${name}`,
            email: `${email}`,
            c_name: `${c_name}`,
            campaign_name: `${req.query.campaigns_name}`,
            campaign_type: `${req.query.type}`,
          };
          console.log(data);
          // req.session["data"] = data;
          session_storage.setItem("data", data);
          console.log(
            "set sesssion storege before edit page",
            session_storage.getItem("data")
          );
          res.render("campaigns/user/edit/edit", { data });
        }
      }
    );
  });
});

app.get("/campaigns/user/content", (req, res) => {
  console.log(req.query);
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test_db",
    port: 3306,
  });
  // var con = require("./module/mysqlconn");
  var name, email, c_name;
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "SELECT * FROM subscriber_details",
      function (err, result, fields) {
        if (err) {
          throw err;
        } else {
          name = result[0].firstname + " " + result[0].lastname;
          email = result[0].email;
          c_name = result[0].companyname;
          const new_data = {
            name: `${name}`,
            email: `${email}`,
            c_name: `${c_name}`,
            campaign_name: `${req.query.campaigns_name}`,
            email_subject: `${req.query.subject}`,
          };
          var data = session_storage.getItem("data");
          data["subject"] = req.query.subject;
          session_storage.setItem("data", data);
          // var subject = req.query.subject;
          // console.log(subject);
          // req.session[data] = data;
          console.log("in content handler data is ", data);
          console.log(
            "in content handler session storage is  ",
            session_storage.getItem("data")
          );
          res.render("campaigns/user/edit/content", { data });
        }
      }
    );
  });
});

app.get("/campaigns/user/recipients", (req, res) => {
  var data = session_storage.getItem("data");
  data["email_body"] = req.query.email_body;
  console.log("data into recipients handler", data);

  res.render("campaigns/user/edit/recipients", { data });
});

app.get("/campaigns/user/review_email", (req, res) => {
  var data = session_storage.getItem("data");
  data["wts"] = req.query.wtsoption;
  console.log("data into review_email handler", data);
  res.render("campaigns/user/edit/review_email", { data });
});

app.get("/campaigns/user/schedule", (req, res) => {
  var data = session_storage.getItem("data");
  //here nothing to add into data for now
  console.log("data into schedule handler", data);
  res.render("campaigns/user/edit/schedule_email", { data });
});

app.get("/campaigns/user/campaign_status", (req, res) => {
  var data = session_storage.getItem("data");
  var usertime = req.query.time;

  data["time"] = usertime;
  console.log("data into schedule_email with post request handler", data);
  // console.log(usertime);

  // var nowtime = new Date();
  // console.log("now time : ", nowtime);
  // var date1 = new Date(
  //   usertime.slice(0, 4),
  //   usertime.slice(5, 7),
  //   usertime.slice(8, 10),
  //   usertime.slice(11, 13),
  //   usertime.slice(14, 16)
  // );
  // var date2 = new Date(
  //   nowtime.getFullYear(),
  //   nowtime.getMonth(),
  //   nowtime.getDate(),
  //   nowtime.getHours(),
  //   nowtime.getMinutes()
  // );
  // if (date2 < date1) {
  //   date2.setDate(date2.getDate() + 1);
  // }
  // var diff = date2 - date1;
  // console.log("usertime is  : ", date1, "   currrenttime is : ", date2);
  // console.log("defference is : ", diff);

  setTimeout(() => {
    console.log("settime function inside");
    send_email_of_campaigns(data);
  }, 1000);

  // res.render("campaigns/user/edit/campaign_status", { data });
  res.send("campaigns is scheduled");
});

app.get("/session-data", (req, res) => {
  console.log("request for session data");
  res.send(session_storage.getItem("data"));
});

app.get("/campaigns/sent", (req, res) => {
  res.render("campaigns/sent");
});
app.get("/campaigns/drafts", (req, res) => {
  res.render("campaigns/drafts");
});

app.get("/subscribers", (req, res) => {
  res.sendFile(`${srcpath}/subscribers.html`);
});
app.get("/forms", (req, res) => {
  res.sendFile(`${srcpath}/forms.html`);
});
app.get("/sites", (req, res) => {
  res.sendFile(`${srcpath}/sites.html`);
});
app.get("/automation", (req, res) => {
  res.sendFile(`${srcpath}/automation.html`);
});

app.get("*", (req, res) => {
  res.sendFile(`${errorfilespath}/error404.html`);
});

app.listen(port, () => {
  console.log(`app start at port ${port}`);
});
