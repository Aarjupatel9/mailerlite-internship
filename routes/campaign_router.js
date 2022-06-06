const express = require("express");
const os = require("os");
const path = require("path");
const dotenv = require("dotenv");
var nodemailer = require("nodemailer");
var navigator = require("navigator");
const cookieParser = require("cookie-parser");
const session_storage = require("node-sessionstorage");

var bodyParser = require("body-parser");
var urlencodedparser = bodyParser.urlencoded({ extended: false });

const authController = require("../controllers/auth");
var con = require("../module/mysqlconn");
con.connect(function (err) {
  if (err) console.log(err);
});

const router = express.Router();

router.get("/campaigns/outbox", (req, res) => {
  //fetching user data
  var name, email, c_name;
  con.query("SELECT * FROM users_details", function (err, result, fields) {
    if (err) {
      console.log(err);
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
        " SELECT * FROM `campaigns_details` WHERE `user_key`='10000001' AND `campaigns_status` = 'outbox' OR `campaigns_status` = 's_later' ORDER BY `campaign_key` DESC ";
      con.query(getcampaigndetailsquery, function (err, result, field) {
        if (err) {
          console.log(err);
        } else {
          if (result.length > 0) {
            // console.log(result[0].email_body);
            data["cdetails"] = result;
          } else {
            data["cdetails"] = 0;
          }
          // console.log(data);

          res.render("campaigns/outbox.ejs", { data });
        }
      });
    }
  });
});

router.post("/campaigns/create", urlencodedparser, (req, res) => {
  var name, email, c_name;
  con.query("SELECT * FROM users_details", function (err, result, fields) {
    if (err) {
      console.log(err);
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
      res.render("campaigns/create.ejs", { data });
    }
  });
});

router.post("/campaigns/user/edit/", urlencodedparser, (req, res) => {
  var name, email, c_name;
  con.query("SELECT * FROM users_details", function (err, result, fields) {
    if (err) {
      console.log(err);
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
      saveDraftsOfCampaigns(data);
      session_storage.setItem("data_10000001", data);
      console.log(
        "set sesssion storege before edit page",
        session_storage.getItem("data_10000001")
      );
      res.render("campaigns/user/edit/edit.ejs", { data });
    }
  });
});

router.post("/campaigns/user/content", urlencodedparser, (req, res) => {
  console.log(req.body);
  var name, email, c_name;
  con.query("SELECT * FROM users_details", function (err, result, fields) {
    if (err) {
      console.log(err);
    } else {
      name = result[0].firstname + " " + result[0].lastname;
      email = result[0].email;
      c_name = result[0].companyname;
      const new_data = {
        name: `${name}`,
        email: `${email}`,
        c_name: `${c_name}`,
        campaign_name: `${req.body.campaigns_name}`,
        subject: `${req.body.subject}`,
      };
      var data = session_storage.getItem("data_10000001");
      data["subject"] = req.body.subject;
      session_storage.setItem("data_10000001", data);

      saveDraftsOfCampaigns(data);
      console.log("in content handler data is ", data);
      console.log(
        "in content handler session storage is  ",
        session_storage.getItem("data_10000001")
      );
      res.render("campaigns/user/edit/content.ejs", { data });
    }
  });
});

router.post("/campaigns/user/recipients", urlencodedparser, (req, res) => {
  var data = session_storage.getItem("data_10000001");
  data["email_body"] = req.body.email_body;
  saveDraftsOfCampaigns(data);

  console.log("data into recipients handler", data);
  res.render("campaigns/user/edit/recipients.ejs", { data });
});

router.post("/campaigns/user/review_email", urlencodedparser, (req, res) => {
  var data = session_storage.getItem("data_10000001");
  data["wts"] = req.body.wtsoption;
  saveDraftsOfCampaigns(data);
  console.log("data into review_email handler", data);
  res.render("campaigns/user/edit/review_email.ejs", { data });
});

router.post("/campaigns/user/schedule", urlencodedparser, (req, res) => {
  var data = session_storage.getItem("data_10000001");
  //here nothing to add into data for now
  data["time"] = NULL;
  data["status"] = "";
  data["timer"] = null;
  session_storage.setItem("data_10000001", data);

  console.log(
    "data into schedule handler",
    session_storage.getItem("data_10000001")
  );
  res.render("campaigns/user/edit/schedule_email.ejs", { data }); //schedule_email;
});

router.post("/campaigns/user/campaign_status", urlencodedparser, (req, res) => {
  var data = session_storage.getItem("data_10000001");
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

  if (timer < 2147483646) {
    setTimeout(() => {
      console.log("settime function inside");
      sendEmailOfCampaigns(data);
    }, timer);
    var schedule_status = "outbox";
  } else {
    schedule_status = "s_later";
  }

  var sqlquery =
    "INSERT INTO `campaigns_details`(`user_key`,`campaigns_status`, `campaign_name`, `campaign_type`, `subjectofemail`, `email_body`, `whomtosend`, `timeofsend`, `timeofscheduled`) VALUES ('10000001','" +
    schedule_status +
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
    data.time.toUTCString() +
    "','" +
    data.current_time.toUTCString() +
    "')";
  console.log(
    "database saved time : ",
    data.time.toUTCString(),
    "   And current time is :  ",
    data.current_time.toUTCString()
  );

  con.query(sqlquery, function (err, result) {
    if (err) console.log(err);
    console.log("Number of records inserted: " + result.affectedRows);
  });

  data["status"] = "scheduled";
  data["timer"] = timer;
  session_storage.setItem("data_10000001", data);
  console.log(session_storage.getItem("data_10000001"));
  // if (data.status == "scheduled") {
  //   res.render("campaigns/outbox", { data });
  // } else {
  res.render("campaigns/user/edit/schedule_email.ejs", { data });
  // res.send("campaigns is scheduled");
  // }
});

router.get("/campaigns/sent", (req, res) => {
  var name, email, c_name;
  con.query("SELECT * FROM users_details", function (err, result, fields) {
    if (err) {
      console.log(err);
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
        " SELECT * FROM `campaigns_details` WHERE `user_key`='10000001' AND `campaigns_status` = 'sent' ORDER BY `campaign_key` DESC ";
      con.query(getcampaigndetailsquery, function (err, result, field) {
        if (err) {
          console.log(err);
        } else {
          if (result.length > 0) {
            // console.log(result[0].email_body);
            data["cdetails"] = result;
          } else {
            data["cdetails"] = 0;
          }
          res.render("campaigns/sent.ejs", { data });
        }
      });
    }
  });
});

router.get("/campaigns/drafts", (req, res) => {
  con.query("SELECT * FROM users_details", function (err, result, fields) {
    if (err) {
      console.log(err);
    } else {
      var name = result[0].firstname + " " + result[0].lastname;
      var email = result[0].email;
      var c_name = result[0].companyname;
      data = {
        name: `${name}`,
        email: `${email}`,
        c_name: `${c_name}`,
      };
      con.query(
        "SELECT * FROM `campaigns_details` WHERE `user_key`='10000001' AND `campaigns_status`='draft'  ",
        function (err, result, fields) {
          if (err) {
            console.log(err);
          } else {
            // console.log(result);
            data["draftdetails"] = result;
            // console.log(data);
            res.render("campaigns/drafts.ejs", { data });
          }
        }
      );
    }
  });
});



module.exports = router;