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

const mysql = require("mysql");
const request = require("request");
const response = require("express/lib/response");


const app = express();
const { NULL } = require("mysql/lib/protocol/constants/types");
const { name } = require("ejs");
const { use } = require("express/lib/application");
const { time } = require("console");



var con = require("./module/mysqlconn");
con.connect(function (err) {
  if (err) console.log(err);
});


// Create application/x-www-form-urlencoded parser
port = process.env.port || 8080;

const SRCPATH = path.join(__dirname, "src");
const ERRORFILEPATH = path.join(__dirname, "errorfiles");
const EDITORFILEPATH = path.join(__dirname, "text-editor");
const PUBLICPATH = path.join(__dirname, "/public");

dotenv.config({ path: "./.env" });

app.use(express.static(PUBLICPATH));
app.use(cookieParser());
app.use(express.json());

app.set("view engine", "ejs");
app.set("view engine", "hbs");

//define router
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


function sendEmailOfCampaigns(data) {
  console.log("send email  function inside", data);
  console.log("data.campaign_name : ", data.campaign_name);
  //we have to find user key of the user from database but now declare statisllyu here
  var userkey = 10000001; //for user travelagency3111@gmail.com
  //fetch the subscribers email from database
  var table_name = "subscriber_of_users";
  con.query(
    "SELECT * FROM `" + table_name + "` WHERE `user_key`=" + userkey + "",
    function (err, result, fields) {
      if (err) {
        console.log(err);
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

function saveDraftsOfCampaigns(data) {
  console.log("enter in save drafts");
  var draftsdata = {
    campaign_name: data.campaign_name,
  };
  if (data.campaign_name) {
    // console.log(data.campaign_name);
  }
  if (data.campaign_type) {
    draftsdata["campaign_type"] = data.campaign_type;
  } else {
    draftsdata["campaign_type"] = "";
  }
  if (data.subject) {
    draftsdata["subjectofemail"] = data.subject;
  } else {
    draftsdata["subjectofemail"] = "";
  }
  if (data.email_body) {
    draftsdata["email_body"] = data.email_body;
  } else {
    draftsdata["email_body"] = "";
  }
  if (data.wts) {
    draftsdata["whomtosend"] = data.wts;

    // Now, whole campaign details is collected only schedulation is not complited so we will store it as draft
    // console.log(" drafts data is :  ", draftsdata);
    drftquery =
      "INSERT INTO `campaigns_details`(`user_key`,`campaigns_status`, `campaign_name`, `campaign_type`, `subjectofemail`, `email_body`, `whomtosend`, `timeofsend`, `timeofscheduled`) VALUES ('10000001','" +
      "draft" +
      "','" +
      draftsdata.campaign_name +
      "','" +
      draftsdata.campaign_type +
      "','" +
      draftsdata.subjectofemail +
      "','" +
      draftsdata.email_body +
      "','" +
      draftsdata.whomtosend +
      "','','')"; //timetosend and scheduled time in draft row will be empty

    // con.query(drftquery, function (err, result) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(result);
    //   }
    // });
  } else {
    draftsdata["whomtosend"] = "";
  }
}

function getMounthNumber(mounthname) {
  if (mounthname == "Jan") {
    return 0;
  } else if (mounthname == "Feb") {
    return 1;
  } else if (mounthname == "March") {
    return 2;
  } else if (mounthname == "Apr") {
    return 3;
  } else if (mounthname == "May") {
    return 4;
  } else if (mounthname == "Jun") {
    return 5;
  } else if (mounthname == "July") {
    return 6;
  } else if (mounthname == "Aug") {
    return 7;
  } else if (mounthname == "Sept") {
    return 8;
  } else if (mounthname == "Oct") {
    return 5;
  } else if (mounthname == "Nov") {
    return 10;
  } else if (mounthname == "Dec") {
    return 11;
  }
}

//for trial this request handler is used
app.get("/try.html", (req, res) => {
  res.sendFile(`${SRCPATH}/try.ejs`);
});
app.get("/try.ejs", (req, res) => {
  res.render("campaigns/try");
});
app.post("/get-tryal-json-object", (req, res) => {
  res.send({ name: "aarju patel from json object" });
});
app.get("/text-editor", (req, res) => {
  res.sendFile(`${EDITORFILEPATH}/editor.html`);
});

//api for deal with request from web-app

app.post("/cancel-set-campaign", urlencodedparser, (req, res) => {
  console.log("enter in api");
  var campaign_name = req.body.campaign_name;
  var subjectofemail = req.body.subjectofemail;
  var email_body = req.body.email_body;
  var timeofsend = req.body.timeofsend;
  var campaign_key = req.body.campaign_key;

  //now we will remove it from outbox and set as drafts
  var outboxtodrafftquery =
    "INSERT INTO `campaigns_details` (`user_key`,`campaigns_status`, `campaign_name`, `campaign_type`, `subjectofemail`, `email_body`, `whomtosend`, `timeofsend`, `timeofscheduled`) VALUES ('10000001','" +
    "draft" +
    "','" +
    campaign_name +
    "','option1','" + //by default
    subjectofemail +
    "','" +
    email_body +
    "','toall','','')";

  var removefromoutboxquery =
    "DELETE FROM `campaigns_details` WHERE `user_key`='10000001' AND `campaigns_status`= 'outbox' AND `campaign_name` = '" +
    campaign_name +
    "' AND `subjectofemail` ='" +
    subjectofemail +
    "' AND `email_body`='" +
    email_body +
    "' AND `timeofsend`='" +
    timeofsend +
    "' AND `campaign_key` ='" +
    campaign_key +
    "' ";

  con.query(outboxtodrafftquery, function (err, result) {
    if (err) {
      res.send({ response_status: "0" });
      console.log(err);
    } else {
      console.log("save as draft query affect row : ", result.affectedRows);
      con.query(removefromoutboxquery, function (err, result) {
        if (err) {
          res.send({ response_status: "0" });
          console.log(err);
        } else {
          res.send({ response_status: "1" });
          console.log("remove query affect row: ", result.affectedRows);
        }
      });
    }
  });
});

//endpoints for the web-app

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

  // console.log(req.headers.host);

  //imp
  var name, email, c_name;
  con.query("SELECT * FROM subscriber_details", function (err, result, fields) {
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

app.post("/campaigns/create", urlencodedparser, (req, res) => {
  var name, email, c_name;
  con.query("SELECT * FROM subscriber_details", function (err, result, fields) {
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

app.post("/campaigns/user/edit/", urlencodedparser, (req, res) => {
  var name, email, c_name;
  con.query("SELECT * FROM subscriber_details", function (err, result, fields) {
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

app.post("/campaigns/user/content", urlencodedparser, (req, res) => {
  console.log(req.body);
  var name, email, c_name;
  con.query("SELECT * FROM subscriber_details", function (err, result, fields) {
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

app.post("/campaigns/user/recipients", urlencodedparser, (req, res) => {
  var data = session_storage.getItem("data_10000001");
  data["email_body"] = req.body.email_body;
  saveDraftsOfCampaigns(data);

  console.log("data into recipients handler", data);
  res.render("campaigns/user/edit/recipients.ejs", { data });
});

app.post("/campaigns/user/review_email", urlencodedparser, (req, res) => {
  var data = session_storage.getItem("data_10000001");
  data["wts"] = req.body.wtsoption;
  saveDraftsOfCampaigns(data);
  console.log("data into review_email handler", data);
  res.render("campaigns/user/edit/review_email.ejs", { data });
});

app.post("/campaigns/user/schedule", urlencodedparser, (req, res) => {
  var data = session_storage.getItem("data_10000001");
  //here nothing to add into data for now
  data["time"] = NULL;
  data["status"] = "";
  data["timer"] = null;
  session_storage.setItem("data_10000001", data);

  console.log("data into schedule handler", session_storage.getItem("data_10000001"));
  res.render("campaigns/user/edit/schedule_email.ejs", { data }); //schedule_email;
});

app.post("/campaigns/user/campaign_status", urlencodedparser, (req, res) => {
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

app.get("/session-data", (req, res) => {
  console.log("request for session data");
  res.send(session_storage.getItem("data_10000001"));
});

app.get("/campaigns/sent", (req, res) => {
  var name, email, c_name;
  con.query("SELECT * FROM subscriber_details", function (err, result, fields) {
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

app.get("/campaigns/drafts", (req, res) => {
  con.query("SELECT * FROM subscriber_details", function (err, result, fields) {
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
  //at start the server the remaining(previouslly unsent which is
  //in outbox due to server failure(crash)) email
  // must be sent at their time
  //this functionality is define here at server start functionx
  con.query(
    "SELECT * FROM `campaigns_details` WHERE `campaigns_status` = 'outbox'",
    function (err, result, fields) {
      if (err) {
        console.log(err);
      } else {
        for (let i = 0; i < result.length; i++) {
          // console.log("enter in for loop");
          console.log(result[i].timeofsend);
          var time_to_send = result[i].timeofsend;
          console.log(getMounthNumber(time_to_send.slice(8, 11)));
          var time_to_send1 = new Date(
            time_to_send.slice(12, 16),
            getMounthNumber(time_to_send.slice(8, 11)),
            time_to_send.slice(4, 7),
            time_to_send.slice(17, 19),
            time_to_send.slice(20, 22)
          );
          var time_to_send2 = new Date(time_to_send1.getTime() + 3600000 * 5.5);
          // console.log("per : ", getMounthNumber(time_to_send.slice(8, 11)));
          var current_time = new Date();
          var current_local_time = new Date(
            current_time.getTime() + 3600000 * 5.5
          );
          var timer = time_to_send2 - current_local_time;
          console.log("time to send : ", time_to_send2);
          console.log("current local time : ", current_local_time);
          console.log(timer);
          //make object for sending email
          const cdetails = {
            userkey: `${result[i].user_key}`,
            campaign_name: `${result[i].campaign_name}`,
            subject: `${result[i].subjectofemail}`,
            email_body: `${result[i].email_body}`,
            wts: `${result[i].whomtosend}`,
            campaign_type: `${result[i].campaign_type}`,
          };
          // console.log(cdetails);
          if (timer) {
            setTimeout(() => {
              console.log("settime function inside at server starrt");
              sendEmailOfCampaigns(cdetails);
            }, timer);
          } else {
            console.log("timer error at starting");
          }
        }
      }
    }
  );
});
