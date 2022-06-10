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

// functions 

function sendEmailOfCampaigns(user_key, campaign_key) {
  console.log("send email  function inside", user_key, campaign_key);
  // return;
  //NOW WI HAVE TO FETCH DRAFT DETAILS FROM DATABASE THROUGH CAMPAIGN_KEY
  var draftdetails = [];
  const fetchingdraftdetails =
    "SELECT * FROM `campaigns_details` WHERE `campaign_key`='" +
    campaign_key +
    "'";
  con.query(fetchingdraftdetails, function (err, result, field) {
    if (err) {
      console.log(err);
    } else {
      draftdetails["campaign_name"] = result[0].campaign_name;
      draftdetails["campaign_type"] = result[0].campaign_type;
      draftdetails["subjectofemail"] = result[0].subjectofemail;
      draftdetails["whomtosend"] = result[0].whomtosend;
      draftdetails["email_body"] = result[0].email_body;
    }
  });
  //we have to find user key of the user from database but now declare statisllyu here
  //req.user_key; //for user travelagency3111@gmail.com
  //fetch the subscribers email from database
  con.query(
    "SELECT * FROM `subscriber_of_users` WHERE `user_key`=" + user_key + "",
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
            subject: `${draftdetails["subjectofemail"]}`,
            text: `${draftdetails["email_body"]}`,
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent : " + info.response);
              console.log("enter in send email section , email is in progress");
              var campaign_update_query =
                "UPDATE `campaigns_details` SET `campaigns_status`='sent' WHERE `user_key`= '" +
                user_key +
                "' AND `campaign_key`='" +
                campaign_key +
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

async function saveDraftsOfCampaigns(user_key, session_draft_details) {
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

const router = express.Router();

router.get("/outbox", authController.isLoggedIn, (req, res) => {
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

router.post(
  "/create",
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

router.post(
  "/user/edit/",
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

router.post(
  "/user/content",
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

router.post(
  "/user/recipients",
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

router.post(
  "/user/review_email",
  urlencodedparser,
  authController.isLoggedIn,
  (req, res) => {
    const user_key = req.user_key;
    const campaign_key = req.body.campaign_key;

    if (req.body.campaign_key === undefined) {
      console.log("ENTER IN IF CONDITION");
      const user_key = req.user_key;
      var session_draft_details = session_storage.getItem(
        "session_draft_details_" + user_key + ""
      );
      session_draft_details["wts"] = req.body.wtsoption;
      console.log(
        "session_draft_details into review_email handler",
        session_draft_details
      );
      saveDraftsOfCampaigns(user_key, session_draft_details);

      // now we have to fetch campaign_key and all other data from the database
      const fetchdraftdetails =
        "SELECT * FROM `campaigns_details`  WHERE `user_key` ='" +
        user_key +
        "' AND `campaigns_status` = 'draft' ORDER BY `campaign_key` DESC";
      con.query(fetchdraftdetails, function (err, result, field) {
        if (err) {
          console.log(err);
        } else {
          const data = [];
          data["campaign_key"] = result[0].campaign_key;
          data["s_name"] = result[0].firstname + " " + result[0].lastname;
          data["email"] = result[0].email;
          data["companyname"] = result[0].companyname;
          data["campaign_name"] = result[0].campaign_name;
          data["campaign_type"] = result[0].campaign_type;
          data["subject"] = result[0].subjectofemail;
          data["wts"] = result[0].whomtosend;
          data["email_body"] = result[0].email_body;
          con.query(
            "SELECT * FROM users_details WHERE `user_key`='" + user_key + "'",
            function (err, result1, fields) {
              if (err) {
                console.log(err);
              } else {
                data["name"] = result1[0].firstname + " " + result1[0].lastname;
                data["email"] = result1[0].email;
                data["companyname"] = result1[0].companyname;

                res.render("campaigns/user/edit/review_email.ejs", { data });
              }
            }
          );
        }
      });
      // const data = session_draft_details;
    } else {
      console.log("enter in schedue email from draft user key : ", user_key);
      console.log(
        "enter in schedue email from draft campaign key : ",
        campaign_key
      );
      const fetchingdraftdetails =
        "SELECT * FROM `campaigns_details` INNER JOIN `users_details` ON `campaigns_details`.`user_key`=`users_details`.`user_key` WHERE `campaign_key`='" +
        campaign_key +
        "'";
      con.query(fetchingdraftdetails, function (err, result, field) {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          var data = [];
          data["name"] = result[0].firstname + " " + result[0].lastname;
          data["email"] = result[0].email;
          data["companyname"] = result[0].companyname;
          data["campaign_name"] = result[0].campaign_name;
          data["campaign_key"] = campaign_key;
          data["campaign_type"] = result[0].campaign_type;
          data["subject"] = result[0].subjectofemail;
          data["wts"] = result[0].whomtosend;
          data["email_body"] = result[0].email_body;
          console.log("data set from else review email condition : ", data);

          res.render("campaigns/user/edit/review_email.ejs", { data });
          // console.log('hello');

          // res.send({ name: "hello" });
        }
      });
    }
  }
);

router.post(
  "/user/schedule",
  urlencodedparser,
  authController.isLoggedIn,
  (req, res) => {
    const user_key = req.user_key;

    var data = [];
    console.log(
      "campaign key in scheduler handler is : ",
      req.body.campaign_key
    );

    data["campaign_key"] = req.body.campaign_key;
    data["name"] = req.body.s_name;
    data["email"] = req.body.email;
    data["campaign_name"] = req.body.campaign_name;
    data["campaign_type"] = req.body.campaign_type;
    data["subject"] = req.body.subject;
    data["email_body"] = req.body.email_body;
    data["wts"] = req.body.wts;
    data["time"] = NULL;
    data["status"] = "";
    data["timer"] = null;

    res.render("campaigns/user/edit/schedule_email.ejs", { data }); //schedule_email;
  }
);

router.post(
  "/user/campaign_status",
  urlencodedparser,
  authController.isLoggedIn,
  (req, res) => {
    var user_key = req.user_key;
    var campaign_key = req.body.campaign_key;
    console.log("campaign_key is : ", campaign_key);

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

    console.log(
      "user_provided_time is  : ",
      time_to_schedule_email,
      "   currrenttime is : ",
      current_local_time
    );
    console.log("defference is : ", timer);

    var schedule_status;
    if (timer < 2147483646) {
      setTimeout(() => {
        console.log("settime function inside");
        sendEmailOfCampaigns(user_key, campaign_key);
      }, timer);
      schedule_status = "outbox";
    } else {
      schedule_status = "s_later";
    }

    var sqlquery =
      "UPDATE `campaigns_details` SET `campaigns_status`='" +
      schedule_status +
      "', `timeofsend`='" +
      time_to_schedule_email.toUTCString() +
      "',`timeofscheduled`='" +
      current_local_time.toUTCString() +
      "' WHERE `campaign_key`='" +
      campaign_key +
      "'";
    con.query(sqlquery, function (err, result) {
      if (err) console.log(err);
      console.log("Number of records inserted: " + result.affectedRows);
      console.log("and result of this query is :  " + result);
    });
    const data = [];
    data["status"] = "scheduled";
    data["timer"] = timer;
    // session_storage.setItem(
    //   "session_draft_details_" + user_key + "",
    //   session_draft_details
    // );
    // console.log(
    //   session_storage.getItem("session_draft_details_" + user_key + "")
    // );
    // if (session_draft_details.status == "scheduled") {
    //   res.render("campaigns/outbox", {data});
    // } else {
    // const data = session_draft_details;
    res.render("campaigns/user/edit/schedule_email.ejs", { data });
    // res.send("campaigns is scheduled");
    // }
  }
);

router.get("/sent", authController.isLoggedIn, (req, res) => {
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

router.get("/drafts", authController.isLoggedIn, (req, res) => {
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
              if (result.length > 0) {
                // console.log(result[0].email_body);
                session_draft_details["draftdetails"] = result;
              } else {
                session_draft_details["draftdetails"] = 0;
              }

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



module.exports = router;