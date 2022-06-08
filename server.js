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
const authController = require("./controllers/auth.js");

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
// app.use('/', require('./routes/pages'));
// app.use('/auth', require('./routes/auth'));
//  app.use('/auth', require('./routes/campaign_router'));

//experimental area

app.get("/signup", (req, res) => {
  var message = "hii";
  res.render("signup.hbs", { message });
});
app.get("/login", (req, res) => {
  var message = "hii";
  res.render("login.hbs", { message });
});
app.get("/profile", authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.render("profile.hbs", {
      user: req.user,
    });
  } else {
    res.redirect("/login");
  }
});
app.post("/signup", urlencodedparser, authController.signup);
app.post("/login", urlencodedparser, authController.login);
app.get("/logout", authController.logout);

//function use in the app
function sendEmailOfCampaigns(session_draft_details) {
  console.log("send email  function inside", session_draft_details);
  console.log(
    "session_draft_details.campaign_name : ",
    session_draft_details.campaign_name
  );
  //we have to find user key of the user from database but now declare statisllyu here
  var userkey = 10000001;//req.user_key; //for user travelagency3111@gmail.com
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
            subject: `${session_draft_details.subject}`,
            text: `${session_draft_details.email_body}`,
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent : " + info.response);
              console.log("enter in send email section , email is in progress");
              var campaign_update_query =
                "UPDATE `campaigns_details` SET `campaigns_status`='sent' WHERE `user_key`= '10000001' AND `subjectofemail`='" +
                session_draft_details.subject +
                "' AND `campaign_name`='" +
                session_draft_details.campaign_name +
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

function saveDraftsOfCampaigns(user_key, session_draft_details) {
  console.log("user key is : ", user_key);

  console.log("enter in save drafts");
  var draftsdata = {
    campaign_name: session_draft_details.campaign_name,
  };
  if (session_draft_details.campaign_name) {
    // console.log(session_draft_details.campaign_name);
  }
  if (session_draft_details.campaign_type) {
    draftsdata["campaign_type"] = session_draft_details.campaign_type;
  } else {
    draftsdata["campaign_type"] = "";
  }
  if (session_draft_details.subject) {
    draftsdata["subjectofemail"] = session_draft_details.subject;
  } else {
    draftsdata["subjectofemail"] = "";
  }
  if (session_draft_details.email_body) {
    draftsdata["email_body"] = session_draft_details.email_body;
  } else {
    draftsdata["email_body"] = "";
  }
  if (session_draft_details.wts) {
    draftsdata["whomtosend"] = session_draft_details.wts;

    // Now, whole campaign details is collected only schedulation is not complited so we will store it as draft
    // console.log(" drafts data is :  ", draftsdata);
    drftquery =
      "INSERT INTO `campaigns_details`(`user_key`,`campaigns_status`, `campaign_name`, `campaign_type`, `subjectofemail`, `email_body`, `whomtosend`, `timeofsend`, `timeofscheduled`) VALUES ('" +
      user_key +
      "','" +
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

    con.query(drftquery, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
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

app.post(
  "/cancel-set-campaign",
  authController.isLoggedIn,
  urlencodedparser,
  (req, res) => {
    console.log("enter in api");
    const user_key = req.user_key;

    var campaign_name = req.body.campaign_name;
    var subjectofemail = req.body.subjectofemail;
    var email_body = req.body.email_body;
    var timeofsend = req.body.timeofsend;
    var campaign_key = req.body.campaign_key;

    //now we will remove it from outbox and set as drafts
    var outboxtodrafftquery =
      "INSERT INTO `campaigns_details` (`user_key`,`campaigns_status`, `campaign_name`, `campaign_type`, `subjectofemail`, `email_body`, `whomtosend`, `timeofsend`, `timeofscheduled`) VALUES ('" +
      user_key +
      "','" +
      "draft" +
      "','" +
      campaign_name +
      "','option1','" + //by default
      subjectofemail +
      "','" +
      email_body +
      "','toall','','')";

    var removefromoutboxquery =
      "DELETE FROM `campaigns_details` WHERE `user_key`='" +
      user_key +
      "' AND `campaigns_status`= 'outbox' AND `campaign_name` = '" +
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
  }
);

// universal endpoints for the web-app

app.get("/", authController.isLoggedIn, (req, res) => {
  console.log("enrter in / page ");
  console.log(req.isloggedin, " ", req.user_key);
  // var user = [];
  // user["access"] = 1;
  var name, email, c_name;
  con.query(
    "SELECT * FROM users_details WHERE `user_key`='" + req.user_key + "'",
    function (err, result, fields) {
      if (err) {
        console.log(err);
      } else {
        name = result[0].firstname + " " + result[0].lastname;
        email = result[0].email;
        c_name = result[0].companyname;
        const session_draft_details = {
          name: `${name}`,
          email: `${email}`,
          c_name: `${c_name}`,
          // dbrowser:`${detectBrowser()}`
        };
        // console.log(session_draft_details);
        const data = session_draft_details;
        res.render("home/home.ejs", { data });
      }
    }
  );
});

app.get("/campaigns/outbox", authController.isLoggedIn, (req, res) => {
  //fetching user data
  var name, email, c_name;
  var user_key = req.user_key;
  con.query(
    "SELECT * FROM users_details WHERE `user_key`='" + user_key + "'",
    function (err, result, fields) {
      if (err) {
        console.log(err);
      } else {
        name = result[0].firstname + " " + result[0].lastname;
        email = result[0].email;
        c_name = result[0].companyname;
        var session_draft_details = {
          name: `${name}`,
          email: `${email}`,
          c_name: `${c_name}`,
        };
        // console.log(session_draft_details);
        var getcampaigndetailsquery =
          " SELECT * FROM `campaigns_details` WHERE `user_key`='" +
          user_key +
          "' AND (`campaigns_status` = 'outbox' OR `campaigns_status` = 's_later') ORDER BY `campaign_key` DESC ";
        con.query(getcampaigndetailsquery, function (err, result, field) {
          if (err) {
            console.log(err);
          } else {
            if (result.length > 0) {
              // console.log(result[0].email_body);
              session_draft_details["cdetails"] = result;
            } else {
              session_draft_details["cdetails"] = 0;
            }
            // console.log(session_draft_details);
            const data = session_draft_details;

            res.render("campaigns/outbox.ejs", { data });
          }
        });
      }
    }
  );
});

app.post(
  "/campaigns/create",
  authController.isLoggedIn,
  urlencodedparser,
  (req, res) => {
    var name, email, c_name;
    con.query(
      "SELECT * FROM users_details WHERE `user_key`='" + req.user_key + "'",
      function (err, result, fields) {
        if (err) {
          console.log(err);
        } else {
          name = result[0].firstname + " " + result[0].lastname;
          email = result[0].email;
          c_name = result[0].companyname;
          const session_draft_details = {
            name: `${name}`,
            email: `${email}`,
            c_name: `${c_name}`,
          };
          const data = session_draft_details;
          // console.log(session_draft_details);
          res.render("campaigns/create.ejs", { data });
        }
      }
    );
  }
);

app.post(
  "/campaigns/user/edit/",
  urlencodedparser,
  authController.isLoggedIn,
  (req, res) => {
    const user_key = req.user_key;
    var name, email, c_name;
    con.query(
      "SELECT * FROM users_details WHERE `user_key`='" + user_key + "'",
      function (err, result, fields) {
        if (err) {
          console.log(err);
        } else {
          name = result[0].firstname + " " + result[0].lastname;
          email = result[0].email;
          c_name = result[0].companyname;
          const session_draft_details = {
            name: `${name}`,
            email: `${email}`,
            c_name: `${c_name}`,
            campaign_name: `${req.body.campaigns_name}`,
            campaign_type: `${req.body.type}`,
          };
          // console.log(session_draft_details);
          saveDraftsOfCampaigns(user_key, session_draft_details);
          session_storage.setItem(
            "session_draft_details_" + user_key + "",
            session_draft_details
          );
          console.log(
            "set sesssion storege before edit page",
            session_storage.getItem("session_draft_details_" + user_key + "")
          );
          const data = session_draft_details;

          res.render("campaigns/user/edit/edit.ejs", { data });
        }
      }
    );
  }
);

app.post(
  "/campaigns/user/content",
  urlencodedparser,
  authController.isLoggedIn,
  (req, res) => {
    console.log(req.body);
    const user_key = req.user_key;
    var name, email, c_name;
    con.query(
      "SELECT * FROM users_details WHERE `user_key`='" + user_key + "'",
      function (err, result, fields) {
        if (err) {
          console.log(err);
        } else {
          name = result[0].firstname + " " + result[0].lastname;
          email = result[0].email;
          c_name = result[0].companyname;
          const new_session_draft_details = {
            name: `${name}`,
            email: `${email}`,
            c_name: `${c_name}`,
            campaign_name: `${req.body.campaigns_name}`,
            subject: `${req.body.subject}`,
          };
          var session_draft_details = session_storage.getItem(
            "session_draft_details_" + user_key + ""
          );
          session_draft_details["subject"] = req.body.subject;
          session_storage.setItem(
            "session_draft_details_" + user_key + "",
            session_draft_details
          );
          console.log("session_draft_details_" + user_key + "");

          saveDraftsOfCampaigns(user_key, session_draft_details);
          console.log(
            "in content handler session_draft_details is ",
            session_draft_details
          );
          console.log(
            "in content handler session storage is  ",
            session_storage.getItem("session_draft_details_" + user_key + "")
          );
          const data = session_draft_details;
          res.render("campaigns/user/edit/content.ejs", { data });
        }
      }
    );
  }
);

app.post(
  "/campaigns/user/recipients",
  urlencodedparser,
  authController.isLoggedIn,
  (req, res) => {
    const user_key = req.user_key;
    var session_draft_details = session_storage.getItem(
      "session_draft_details_" + user_key + ""
    );
    session_draft_details["email_body"] = req.body.email_body;
    saveDraftsOfCampaigns(user_key, session_draft_details);

    console.log(
      "session_draft_details into recipients handler",
      session_draft_details
    );
    const data = session_draft_details;
    res.render("campaigns/user/edit/recipients.ejs", { data });
  }
);

app.post(
  "/campaigns/user/review_email",
  urlencodedparser,
  authController.isLoggedIn,
  (req, res) => {
    const user_key = req.user_key;
    var session_draft_details = session_storage.getItem(
      "session_draft_details_" + user_key + ""
    );
    session_draft_details["wts"] = req.body.wtsoption;
    saveDraftsOfCampaigns(user_key, session_draft_details);
    console.log(
      "session_draft_details into review_email handler",
      session_draft_details
    );
    const data = session_draft_details;
    res.render("campaigns/user/edit/review_email.ejs", { data });
  }
);

app.post(
  "/campaigns/user/schedule",
  urlencodedparser,
  authController.isLoggedIn,
  (req, res) => {
    const user_key = req.user_key;
    var session_draft_details = session_storage.getItem(
      "session_draft_details_" + user_key + ""
    );
    //here nothing to add into session_draft_details for now
    session_draft_details["time"] = NULL;
    session_draft_details["status"] = "";
    session_draft_details["timer"] = null;
    session_storage.setItem(
      "session_draft_details_" + user_key + "",
      session_draft_details
    );

    console.log(
      "session_draft_details into schedule handler",
      session_storage.getItem("session_draft_details_" + user_key + "")
    );
    const data = session_draft_details;
    res.render("campaigns/user/edit/schedule_email.ejs", { data }); //schedule_email;
  }
);

app.post(
  "/campaigns/user/campaign_status",
  urlencodedparser,
  authController.isLoggedIn,
  (req, res) => {
    var user_key = req.user_key;
    var session_draft_details = session_storage.getItem(
      "session_draft_details_" + user_key + ""
    );
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
    session_draft_details["time"] = time_to_schedule_email;
    session_draft_details["current_time"] = current_local_time;
    console.log(
      "user_provided_time is  : ",
      time_to_schedule_email,
      "   currrenttime is : ",
      current_local_time
    );
    console.log(
      "defference is : ",
      time_to_schedule_email - current_local_time
    );

    if (timer < 2147483646) {
      setTimeout(() => {
        console.log("settime function inside");
        sendEmailOfCampaigns(session_draft_details);
      }, timer);
      var schedule_status = "outbox";
    } else {
      schedule_status = "s_later";
    }

    var sqlquery =
      "INSERT INTO `campaigns_details`(`user_key`,`campaigns_status`, `campaign_name`, `campaign_type`, `subjectofemail`, `email_body`, `whomtosend`, `timeofsend`, `timeofscheduled`) VALUES ('" +
      user_key +
      "','" +
      schedule_status +
      "','" +
      session_draft_details.campaign_name +
      "','" +
      session_draft_details.campaign_type +
      "','" +
      session_draft_details.subject +
      "','" +
      session_draft_details.email_body +
      "','" +
      session_draft_details.wts +
      "','" +
      session_draft_details.time.toUTCString() +
      "','" +
      session_draft_details.current_time.toUTCString() +
      "')";
    console.log(
      "database saved time : ",
      session_draft_details.time.toUTCString(),
      "   And current time is :  ",
      session_draft_details.current_time.toUTCString()
    );

    con.query(sqlquery, function (err, result) {
      if (err) console.log(err);
      console.log("Number of records inserted: " + result.affectedRows);
    });

    session_draft_details["status"] = "scheduled";
    session_draft_details["timer"] = timer;
    session_storage.setItem(
      "session_draft_details_" + user_key + "",
      session_draft_details
    );
    console.log(
      session_storage.getItem("session_draft_details_" + user_key + "")
    );
    // if (session_draft_details.status == "scheduled") {
    //   res.render("campaigns/outbox", {data});
    // } else {
    const data = session_draft_details;
    res.render("campaigns/user/edit/schedule_email.ejs", { data });
    // res.send("campaigns is scheduled");
    // }
  }
);

app.get("/session-data", (req, res) => {
  console.log("request for session session_draft_details");
  res.send(session_storage.getItem("session_draft_details_" + user_key + ""));
});

app.get("/campaigns/sent", authController.isLoggedIn, (req, res) => {
  var name, email, c_name;
  var user_key = req.user_key;
  con.query(
    "SELECT * FROM users_details WHERE `user_key`='" + req.user_key + "'",
    function (err, result, fields) {
      if (err) {
        console.log(err);
      } else {
        name = result[0].firstname + " " + result[0].lastname;
        email = result[0].email;
        c_name = result[0].companyname;
        const session_draft_details = {
          name: `${name}`,
          email: `${email}`,
          c_name: `${c_name}`,
        };
        // console.log(session_draft_details);
        var getcampaigndetailsquery =
          " SELECT * FROM `campaigns_details` WHERE `user_key`='" +
          user_key +
          "' AND `campaigns_status` = 'sent' ORDER BY `campaign_key` DESC ";
        con.query(getcampaigndetailsquery, function (err, result, field) {
          if (err) {
            console.log(err);
          } else {
            if (result.length > 0) {
              // console.log(result[0].email_body);
              session_draft_details["cdetails"] = result;
            } else {
              session_draft_details["cdetails"] = 0;
            }
            const data = session_draft_details;
            res.render("campaigns/sent.ejs", { data });
          }
        });
      }
    }
  );
});

app.get("/campaigns/drafts", authController.isLoggedIn, (req, res) => {
  var user_key = req.user_key;

  con.query(
    "SELECT * FROM users_details WHERE `user_key`='" + req.user_key + "'",
    function (err, result, fields) {
      if (err) {
        console.log(err);
      } else {
        var name = result[0].firstname + " " + result[0].lastname;
        var email = result[0].email;
        var c_name = result[0].companyname;
        session_draft_details = {
          name: `${name}`,
          email: `${email}`,
          c_name: `${c_name}`,
        };
        con.query(
          "SELECT * FROM `campaigns_details` WHERE `user_key`='" +
            user_key +
            "' AND `campaigns_status`='draft'  ",
          function (err, result, fields) {
            if (err) {
              console.log(err);
            } else {
              // console.log(result);
              session_draft_details["draftdetails"] = result;
              // console.log(session_draft_details);
              const data = session_draft_details;
              res.render("campaigns/drafts.ejs", { data });
            }
          }
        );
      }
    }
  );
});

app.get("/subscribers", authController.isLoggedIn, (req, res) => {
  res.sendFile(`${SRCPATH}/subscribers.html`);
});

app.get("/forms", authController.isLoggedIn, (req, res) => {
  res.sendFile(`${SRCPATH}/forms.html`);
});

app.get("/sites", authController.isLoggedIn, (req, res) => {
  res.sendFile(`${SRCPATH}/sites.html`);
});

app.get("/automation", authController.isLoggedIn, (req, res) => {
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


// i have to fetch data draft data from database and then desplay into the review page and go for the schedule
// i saved draft at before review page 
// and fetch data from reviw page for schedule and also have to make changes in the for that drft into the databse
//for scheduling data come from the review page
