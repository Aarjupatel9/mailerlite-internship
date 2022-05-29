const express = require("express");
const path = require("path");
const mysql = require("mysql");
const request = require("request");
const { name } = require("ejs");
const response = require("express/lib/response");
const cookieParser = require("cookie-parser");
// const session = require("express-session");
var nodemailer = require("nodemailer");
const session_storage = require("node-sessionstorage");
const { NULL } = require("mysql/lib/protocol/constants/types");

var con = require("./module/mysqlconn");
con.connect(function (err) {
  if (err) throw err;
});

var bodyParser = require("body-parser");
// Create application/x-www-form-urlencoded parser
var urlencodedparser = bodyParser.urlencoded({ extended: false });  

port = process.env.port || 8080;
const app = express();
const SRCPATH = path.join(__dirname, "src");
const ERRORFILEPATH = path.join(__dirname, "errorfiles");
const EDITORFILEPATH = path.join(__dirname, "text-editor");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

function sendEmailOfCampaigns(data) {
  console.log("send email  function inside");
  //fetch the subscribers email from database
<<<<<<< HEAD
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
=======
  var name, email, c_name;
  var table_name = "s_b_of_" + data.email;
  console.log("table name is : ", table_name);
>>>>>>> bfd1c17e0658cf2a884a6d7b6dda21c8dc5ff1d3

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
}

app.get("/text-editor", (req, res) => {
  res.sendFile(`${EDITORFILEPATH}/editor.html`);
});

app.get("/", (req, res) => {
  var name, email, c_name;
  con.query("SELECT * FROM subscriber_details", function (err, result, fields) {
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
      res.render("home/home", { data });
    }
  });
});
app.get("/dashboard", (req, res) => {
  res.sendFile(`${SRCPATH}/dashboard.html`);
});

app.get("/campaigns/outbox", (req, res) => {
<<<<<<< HEAD
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test_db",
  });
  // var con = require("./module/mysqlconn");
=======
>>>>>>> bfd1c17e0658cf2a884a6d7b6dda21c8dc5ff1d3
  var name, email, c_name;
  con.query("SELECT * FROM subscriber_details", function (err, result, fields) {
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
  });
});

<<<<<<< HEAD
app.get("/campaigns/create", (req, res) => {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test_db",
  });
  // var con = require("./module/mysqlconn");
=======
app.post("/campaigns/create", (req, res) => {
>>>>>>> bfd1c17e0658cf2a884a6d7b6dda21c8dc5ff1d3
  var name, email, c_name;
  con.query("SELECT * FROM subscriber_details", function (err, result, fields) {
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
  });
});

<<<<<<< HEAD
app.get("/campaigns/user/edit/", (req, res) => {
  console.log(req.query);
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test_db",
  });
  // var con = require("./module/mysqlconn");
=======
app.post("/campaigns/user/edit/", urlencodedparser , (req, res) => {
>>>>>>> bfd1c17e0658cf2a884a6d7b6dda21c8dc5ff1d3
  var name, email, c_name;
  con.query("SELECT * FROM subscriber_details", function (err, result, fields) {
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
        campaign_name: `${req.body.campaigns_name}`,
        campaign_type: `${req.body.type}`,
      };
      // console.log(data);
      session_storage.setItem("data", data);
      console.log(
        "set sesssion storege before edit page",
        session_storage.getItem("data")
      );
      res.render("campaigns/user/edit/edit", { data });
    }
  });
});

<<<<<<< HEAD
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
=======
app.post("/campaigns/user/content",urlencodedparser, (req, res) => {
  console.log(req.body);
>>>>>>> bfd1c17e0658cf2a884a6d7b6dda21c8dc5ff1d3
  var name, email, c_name;
  con.query("SELECT * FROM subscriber_details", function (err, result, fields) {
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
        campaign_name: `${req.body.campaigns_name}`,
        email_subject: `${req.body.subject}`,
      };
      var data = session_storage.getItem("data");
      data["subject"] = req.body.subject;
      session_storage.setItem("data", data);

      console.log("in content handler data is ", data);
      console.log(
        "in content handler session storage is  ",
        session_storage.getItem("data")
      );
      res.render("campaigns/user/edit/content", { data });
    }
  });
});

app.post("/campaigns/user/recipients", urlencodedparser, (req, res) => {
  var data = session_storage.getItem("data");
  data["email_body"] = req.body.email_body;
  console.log("data into recipients handler", data);

  res.render("campaigns/user/edit/recipients", { data });
});

app.post("/campaigns/user/review_email",urlencodedparser, (req, res) => {
  var data = session_storage.getItem("data");
  data["wts"] = req.body.wtsoption;
  console.log("data into review_email handler", data);
  res.render("campaigns/user/edit/review_email", { data });
});

app.post("/campaigns/user/schedule",urlencodedparser, (req, res) => {
  var data = session_storage.getItem("data");
  //here nothing to add into data for now
  data["time"] = NULL;
  data["status"] = "";
  data["timer"] = null;
  session_storage.setItem("data", data);

  console.log("data into schedule handler", data);
  res.render("campaigns/user/edit/schedule_email", { data }); //schedule_email;
});

app.post("/campaigns/user/campaign_status",urlencodedparser, (req, res) => {
  var data = session_storage.getItem("data");
  var user_provided_time = req.body.time;
  var user_provided_time1 = new Date(
    user_provided_time.slice(0, 4),
    user_provided_time.slice(5, 7) - 1,
    user_provided_time.slice(8, 10),
    user_provided_time.slice(11, 13),
    user_provided_time.slice(14, 16)
  );
  var time_to_schedule_email = new Date(user_provided_time1.getTime() + 3600000 * 5.5);
  console.log(time_to_schedule_email);
  console.log("user enter time", time_to_schedule_email.toUTCString());
  data["time"] = time_to_schedule_email;

  var current_time = new Date();
  var current_local_time = new Date(current_time.getTime() + 3600000 * 5.5);
  console.log(current_local_time);
  console.log("current local time", current_local_time.toUTCString());

  var timer = time_to_schedule_email - current_local_time;
  console.log("user_provided_time is  : ", time_to_schedule_email, "   currrenttime is : ", current_local_time);
  console.log("defference is : ", time_to_schedule_email - current_local_time);

  setTimeout(() => {
    console.log("settime function inside");
    sendEmailOfCampaigns(data);
  }, timer);

  data["status"] = "scheduled";
  data["timer"] = timer;
  session_storage.setItem("data", data);
  console.log(session_storage.getItem("data"));
  res.render("campaigns/user/edit/schedule_email", { data });
  // res.send("campaigns is scheduled");
});

app.get("/session-data", (req, res) => {
  console.log("request for session data");
  res.send(session_storage.getItem("data"));
});

app.get("/campaigns/sent", (req, res) => {
  var name, email, c_name;
  con.query("SELECT * FROM subscriber_details", function (err, result, fields) {
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
      res.render("campaigns/sent", { data });
    }
  });
});
app.get("/campaigns/drafts", (req, res) => {
  con.query("SELECT * FROM subscriber_details", function (err, result, fields) {
    if (err) {
      throw err;
    } else {
      var name = result[0].firstname + " " + result[0].lastname;
      var email = result[0].email;
      var c_name = result[0].companyname;
      data = {
        name: `${name}`,
        email: `${email}`,
        c_name: `${c_name}`,
      };
      // console.log(data);
      res.render("campaigns/drafts", { data });
    }
  });
});

app.get("/subscribers", (req, res) => {
  res.sendFile(`${SRCPATH}/subscribers.html`);
});
app.get("/forms", (req, res) => {
  res.sendFile(`${SRCPATH}/forms.html`);
});
app.get("/sites", (req, res) => {
  res.sendFile(`${SRCPATH}/sites.html`);
});
app.get("/automation", (req, res) => {
  res.sendFile(`${SRCPATH}/automation.html`);
});

app.get("*", (req, res) => {
  res.sendFile(`${ERRORFILEPATH}/error404.html`);
});

app.listen(port, () => {
  console.log(`app start at port ${port}`);
});