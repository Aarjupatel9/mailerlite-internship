const express = require("express");
const os = require("os");
const path = require("path");
const mysql = require("mysql");
const request = require("request");
const { name } = require("ejs");
const response = require("express/lib/response");
const cookieParser = require("cookie-parser");
// const session = require("express-session");
var nodemailer = require("nodemailer");
var navigator = require("navigator");
const session_storage = require("node-sessionstorage");
const { NULL } = require("mysql/lib/protocol/constants/types");

var con = require("./module/mysqlconn");
con.connect(function (err) {
  if (err) throw err;
});

var bodyParser = require("body-parser");
const { use } = require("express/lib/application");
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

  //we have to find user key of the user from database but now declare statisllyu here
  var userkey = 10000001; //for user travelagency3111@gmail.com

  //fetch the subscribers email from database
  var table_name = "subscriber_of_users";
  con.query(
    "SELECT * FROM `" + table_name + "` WHERE `user_key`=" + userkey + "",
    function (err, result, fields) {
      if (err) {
        throw err;
      } else {
        // console.log(result);
        for (let i = 0; i < result.length; i++) {
          var email = result[i].email;
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
              console.log("Email sent : " + info.response);

              console.log("enter in send email section , email is in progress");
              var campaign_update_query =
                "UPDATE `campaigns_details` SET `campaigns_status`='sent' WHERE `user_key`= '10000001' AND `subjectofemail`='" +
                data.subject +
                "' AND `campaign_name`='" +
                data.campaign_name +
                "'";
              con.query(campaign_update_query, function (err, result) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(result);
                }
              });
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
  // console.log(req)
  function detectBrowser() {
    var hostname = os.hostname();
    console.log("Hostname is:- " + hostname);
    if (
      (navigator.userAgent.indexOf("Opera") ||
        navigator.userAgent.indexOf("OPR")) != -1
    ) {
      console.log("Opera");
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
      console.log("Chrome");
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
      console.log("Safari");
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
      console.log("Firefox");
    } else if (
      navigator.userAgent.indexOf("MSIE") != -1 ||
      !!document.documentMode == true
    ) {
      console.log("IE"); //crap
    } else {
      console.log("Unknown");
    }
  }
  function getDeviceInfo() {
    var hostname = os.hostname();
    console.log("Hostname is:- " + hostname);
  }
  // console.log(req.headers.host);

  //imp
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
        // dbrowser:`${detectBrowser()}`
      };
      // console.log(data);
      res.render("home/home", { data });
    }
  });
});

app.get("/campaigns/outbox", (req, res) => {
  //fetching user data
  var name, email, c_name;
  con.query("SELECT * FROM subscriber_details", function (err, result, fields) {
    if (err) {
      throw err;
    } else {
      name = result[0].firstname + " " + result[0].lastname;
      email = result[0].email;
      c_name = result[0].companyname;
      var data = {
        name: `${name}`,
        email: `${email}`,
        c_name: `${c_name}`,
      };
      // console.log(data);
      var getcampaigndetailsquery =
        " SELECT * FROM `campaigns_details` WHERE `user_key`='10000001' AND `campaigns_status` = 'outbox' ";
      con.query(getcampaigndetailsquery, function (err, result, field) {
        if (err) {
          throw err;
        } else {
          if (result.length > 0) {
            console.log(result[0].email_body);
            data["cdetails"] = result;
          } else {
            data["cdetails"] = 0;
          }
          res.render("campaigns/outbox", { data });
        }
      });
    }
  });
});

app.post("/campaigns/create", (req, res) => {
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

app.post("/campaigns/user/edit/", urlencodedparser, (req, res) => {
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

app.post("/campaigns/user/content", urlencodedparser, (req, res) => {
  console.log(req.body);
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

app.post("/campaigns/user/review_email", urlencodedparser, (req, res) => {
  var data = session_storage.getItem("data");
  data["wts"] = req.body.wtsoption;
  console.log("data into review_email handler", data);
  res.render("campaigns/user/edit/review_email", { data });
});

app.post("/campaigns/user/schedule", urlencodedparser, (req, res) => {
  var data = session_storage.getItem("data");
  //here nothing to add into data for now
  data["time"] = NULL;
  data["status"] = "";
  data["timer"] = null;
  session_storage.setItem("data", data);

  console.log("data into schedule handler", session_storage.getItem("data"));
  res.render("campaigns/user/edit/schedule_email", { data }); //schedule_email;
});

app.post("/campaigns/user/campaign_status", urlencodedparser, (req, res) => {
  var data = session_storage.getItem("data");
  var user_provided_time = req.body.time;
  var user_provided_time1 = new Date(
    user_provided_time.slice(0, 4),
    user_provided_time.slice(5, 7) - 1,
    user_provided_time.slice(8, 10),
    user_provided_time.slice(11, 13),
    user_provided_time.slice(14, 16)
  );
  var time_to_schedule_email = new Date(
    user_provided_time1.getTime() + 3600000 * 5.5
  );
  console.log(time_to_schedule_email);
  console.log("user enter time", time_to_schedule_email.toUTCString());

  var current_time = new Date();
  var current_local_time = new Date(current_time.getTime() + 3600000 * 5.5);
  console.log(current_local_time);
  console.log("current local time", current_local_time.toUTCString());
  var timer = time_to_schedule_email - current_local_time;
  data["time"] = time_to_schedule_email;
  data["current_time"] = current_local_time;
  console.log(
    "user_provided_time is  : ",
    time_to_schedule_email,
    "   currrenttime is : ",
    current_local_time
  );
  console.log("defference is : ", time_to_schedule_email - current_local_time);

  var sqlquery =
    "INSERT INTO `campaigns_details`(`user_key`,`campaigns_status`, `campaign_name`, `campaign_type`, `subjectofemail`, `email_body`, `whomtosend`, `timeofsend`, `timeofscheduled`) VALUES ('10000001','" +
    "outbox" +
    "','" +
    data.campaign_name +
    "','" +
    data.campaign_type +
    "','" +
    data.subject +
    "','" +
    data.email_body +
    "','" +
    data.wts +
    "','" +
    data.time +
    "','" +
    data.current_time +
    "')";

  con.query(sqlquery, function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
  0;

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
      var getcampaigndetailsquery =
        " SELECT * FROM `campaigns_details` WHERE `user_key`='10000001' AND `campaigns_status` = 'sent' ";
      con.query(getcampaigndetailsquery, function (err, result, field) {
        if (err) {
          throw err;
        } else {
          if (result.length > 0) {
            console.log(result[0].email_body);
            data["cdetails"] = result;
          } else {
            data["cdetails"] = 0;
          }
          res.render("campaigns/sent", { data });
        }
      });
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
  //we will define email timeout after some time here 
  //at start the server the remaining email must be sent at their time we will declare here 
  
});
