//here we declare some variable name
// for draft 0, sent 1 ,  outbox 2 , send_later 3, super-admin 4

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
var sendEmailOfCampaigns = require("../module/sendmail");

const { start } = require("repl");
const { render } = require("express/lib/response");

async function saveDraftsOfCampaigns(user_key, session_draft_details) {
  console.log("user key is : ", user_key);

  console.log("enter in save drafts");
  var draftsdata = [];

  if (session_draft_details.campaign_name) {
    draftsdata["campaign_name"] = session_draft_details.campaign_name;
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
      "','0','" +
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

function resolveGroup(result) {
  return new Promise(function (resolve, reject) {
    console.log("result lenght  is : ", result.length);
    var resolved_result = [];
    var counter = 0;
    var result_length1 = result.length;

    for (let i = 0; i < result.length; i++) {
      console.log("enter in foor loop");
      resolved_result[i] = [];
      resolved_result[i]["campaign_key"] = result[i].campaign_key;
      resolved_result[i]["campaign_name"] = result[i].campaign_name;
      resolved_result[i]["campaign_type"] = result[i].campaign_type;
      resolved_result[i]["subjectofemail"] = result[i].subjectofemail;
      resolved_result[i]["email_body"] = result[i].email_body;
      resolved_result[i]["timeofsend"] = result[i].timeofsend;
      resolved_result[i]["timeofschedule"] = result[i].timeofscheduled;

      var str = result[i].whomtosend;
      if (str == "toall") {
        result_length1--;
        // console.log("result length is : ", result_length1);
        resolved_result[i]["whomtosend"] = result[i].whomtosend;
      } else {
        var sql =
          "SELECT `group_name` FROM `group_details` WHERE `group_key`='";
        for (let i = 0; i < str.length; i++) {
          if (i + 2 < str.length) {
            sql = sql + str[i] + "' OR `group_key`='";
          } else {
            sql = sql + str[i] + "'";
          }
          i++;
        }
        con.query(sql, function (err, result1, field) {
          if (err) {
            console.log(err);
          } else {
            var group_str = "group : ";
            for (let i = 0; i < result1.length; i++) {
              if (result1.length != i + 1) {
                group_str = group_str + result1[i].group_name + "\ngroup : ";
              } else {
                group_str = group_str + result1[i].group_name;
              }
            }
            resolved_result[i]["whomtosend"] = group_str;
            counter++;
            // console.log("counter is : ", counter);
          }
        });
      }
      if (result_length1 == counter) {
        resolve(resolved_result);
      }
    }
  });
}

function databaseFetch(sql) {
  return new Promise(function (resolve, reject) {
    con.query(sql, function (err, result, fields) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        var group_str = "group : ";
        for (let i = 0; i < result.length; i++) {
          if (result.length != i + 1) {
            group_str = group_str + result[i].group_name + "\ngroup : ";
          } else {
            group_str = group_str + result[i].group_name;
          }
        }
        // re_data["group_extra_things"] = 1;
        console.log("group str into secound function : ", group_str);
        resolve(group_str);
      }
    });
  });
}

const router = express.Router();

router.get("/outbox", authController.isLoggedIn, (req, res) => {
  //fetching user data
  console.log("ener in outbox ");
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
          "' AND (`campaigns_status` = '2' OR `campaigns_status` = '3') ORDER BY `campaign_key` DESC ";
        con.query(getcampaigndetailsquery, function (err, result, field) {
          if (err) {
            console.log(err);
          } else {
            if (result.length > 0) {
              // console.log(result[0].email_body);
              resolveGroup(result)
                .then((result) => {
                  session_draft_details["cdetails"] = result;
                  const data = session_draft_details;
                  console.log("cdetails in .then cond. is  : ", data);
                  res.render("campaigns/outbox.ejs", { data });
                })
                .catch((e) => {
                  console.log(e);
                });
            } else {
              session_draft_details["cdetails"] = 0;
              const data = session_draft_details;
              res.render("campaigns/outbox.ejs", { data });
            }
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

    console.log(
      "session_draft_details into recipients handler",
      session_draft_details
    );

    const getgroupdetails =
      "SELECT * FROM `group_details` WHERE `user_key`='" + user_key + "'";

    con.query(getgroupdetails, function (err, result, fields) {
      if (err) {
        console.log("error is : ", err);
      } else {
        console.log("result in function is : ", result);

        const data = session_draft_details;

        data["groups"] = result;
        console.log("after adding group data , data is : ", data);
        res.render("campaigns/user/edit/recipients.ejs", { data });
      }
    });
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

      //if cond. for all subscribers // else cond. for perticuler groups
      if (req.body.wtsoption) {
        console.log("enater in if condition");
        session_draft_details["wts"] = req.body.wtsoption;
      } else {
        console.log("enter in else condition");
        const smn = req.body.groups_name;
        console.log(
          "checkbox value is : ",
          smn,
          " and length is  : ",
          smn.length
        );

        if (smn[0].length === 3) {
          var j_object = [];
          for (let i = 0; i < smn.length; i++) {
            j_object[i] = smn[i][1];
          }
          console.log(j_object);
          session_draft_details["wts"] = j_object;
        } else {
          console.log("enter in length is not 3 cond.");
          session_draft_details["wts"] = smn[1];
        }
      }

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
          data["campaign_name"] = result[0].campaign_name;
          data["campaign_type"] = result[0].campaign_type;
          data["subject"] = result[0].subjectofemail;
          data["email_body"] = result[0].email_body;
          //now we have to set the whom to send field
          if (result[0].whomtosend == "toall") {
            data["wts"] = result[0].whomtosend;
            con.query(
              "SELECT * FROM users_details WHERE `user_key`='" + user_key + "'",
              function (err, result1, fields) {
                if (err) {
                  console.log(err);
                } else {
                  data["name"] =
                    result1[0].firstname + " " + result1[0].lastname;
                  data["email"] = result1[0].email;
                  data["c_name"] = result1[0].companyname;
                  console.log(
                    "data set from else review email condition : ",
                    data
                  );
                  res.render("campaigns/user/edit/review_email.ejs", { data });
                }
              }
            );
          } else {
            var str = result[0].whomtosend;
            var sql =
              "SELECT `group_name` FROM `group_details` WHERE `group_key`='";
            // console.log(str);
            // console.log(str.length);
            for (let i = 0; i < str.length; i++) {
              if (i + 2 < str.length) {
                sql = sql + str[i] + "' OR `group_key`='";
              } else {
                sql = sql + str[i] + "'";
              }
              i++;
            }
            console.log(sql);
            con.query(sql, function (err, result, fields) {
              if (err) {
                console.log(err);
              } else {
                var group_str = "group : ";
                for (let i = 0; i < result.length; i++) {
                  if (result.length != i + 1) {
                    group_str = group_str + result[i].group_name + "\ngroup : ";
                  } else {
                    group_str = group_str + result[i].group_name;
                  }
                }
                data["group_extra_things"] = 1;
                data["wts"] = group_str;

                con.query(
                  "SELECT * FROM users_details WHERE `user_key`='" +
                    user_key +
                    "'",
                  function (err, result1, fields) {
                    if (err) {
                      console.log(err);
                    } else {
                      data["name"] =
                        result1[0].firstname + " " + result1[0].lastname;
                      data["email"] = result1[0].email;
                      data["c_name"] = result1[0].companyname;
                      console.log(
                        "data set from else review email condition : ",
                        data
                      );
                      res.render("campaigns/user/edit/review_email.ejs", {
                        data,
                      });
                    }
                  }
                );
              }
            });
          }
        }
      });
      // const data = session_draft_details;

      //this else cond. for draft scheduling
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
          data["c_name"] = result[0].companyname;
          data["campaign_name"] = result[0].campaign_name;
          data["campaign_key"] = campaign_key;
          data["campaign_type"] = result[0].campaign_type;
          data["subject"] = result[0].subjectofemail;
          data["email_body"] = result[0].email_body;
          //now we have to set the whom to send field
          if (result[0].whomtosend == "toall") {
            data["wts"] = result[0].whomtosend;
            console.log("data set from else review email condition : ", data);
            res.render("campaigns/user/edit/review_email.ejs", { data });
          } else {
            var str = result[0].whomtosend;
            var sql =
              "SELECT `group_name` FROM `group_details` WHERE `group_key`='";
            // console.log(str);
            // console.log(str.length);
            for (let i = 0; i < str.length; i++) {
              if (i + 2 < str.length) {
                sql = sql + str[i] + "' OR `group_key`='";
              } else {
                sql = sql + str[i] + "'";
              }
              i++;
            }
            console.log(sql);
            con.query(sql, function (err, result, fields) {
              if (err) {
                console.log(err);
              } else {
                var group_str = "group : ";
                for (let i = 0; i < result.length; i++) {
                  if (result.length != i + 1) {
                    group_str = group_str + result[i].group_name + "\ngroup : ";
                  } else {
                    group_str = group_str + result[i].group_name;
                  }
                }
                data["group_extra_things"] = 1;
                data["wts"] = group_str;

                console.log(
                  "data set from else review email condition : ",
                  data
                );
                res.render("campaigns/user/edit/review_email.ejs", { data });
              }
            });
          }
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

    function getUserDeatails(user_key) {
      return new Promise(function (resolve, reject) {
        const sql =
          "SELECT * FROM `users_details` WHERE `user_key`='" + user_key + "'";
        con.query(sql, function (err, result, field) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    }

    getUserDeatails(user_key).then((result) => {
      var data = [];
      console.log(
        "campaign key in scheduler handler is : ",
        req.body.campaign_key
      );

      data["c_name"] = result[0].companyname;
      data["campaign_key"] = req.body.campaign_key;
      data["name"] = req.body.s_name;
      data["email"] = result[0].email;
      data["campaign_name"] = req.body.campaign_name;
      data["campaign_type"] = req.body.campaign_type;
      data["subject"] = req.body.subject;
      data["email_body"] = req.body.email_body;
      data["wts"] = req.body.wts;
      data["time"] = NULL;
      data["status"] = "";
      data["timer"] = null;

      res.render("campaigns/user/edit/schedule_email.ejs", { data }); //schedule_email;
    });
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

    // var h = new Date();

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
      schedule_status = "2";
    } else {
      schedule_status = "3";
    }
    var duplicatesql =
      "INSERT INTO `campaigns_details`  (`user_key`,`campaigns_status`,`campaign_name`,`campaign_type`,`subjectofemail`,`email_body`,`whomtosend`) SELECT `user_key`,'0',`campaign_name`,`campaign_type`,`subjectofemail`,`email_body`,`whomtosend` FROM `campaigns_details` WHERE  `campaign_key` = '" +
      campaign_key +
      "';";
    con.query(duplicatesql, function (err, result, fields) {
      if (err) {
        console.log(err);
        // throw err;
      } else {
        console.log("result of dulplicate query is : ", result);
      }
    });
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

    res.render("campaigns/user/edit/schedule_email.ejs", { data });
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
          "' AND `campaigns_status` = '1' ORDER BY `campaign_key` DESC ";
        con.query(getcampaigndetailsquery, function (err, result, field) {
          if (err) {
            console.log(err);
          } else {
            if (result.length > 0) {
              // console.log(result[0].email_body);
              resolveGroup(result)
                .then((result) => {
                  session_draft_details["cdetails"] = result;
                  const data = session_draft_details;
                  res.render("campaigns/sent.ejs", { data });
                })
                .catch((e) => {
                  console.log(e);
                });
            } else {
              session_draft_details["cdetails"] = 0;
              const data = session_draft_details;
              res.render("campaigns/sent.ejs", { data });
            }
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
            "' AND `campaigns_status`='0' ORDER BY `campaign_key` DESC ",
          function (err, result, fields) {
            if (err) {
              console.log(err);
            } else {
              // console.log(result);
              var counter = 0;
              if (result.length > 0) {
                function resolveData(result) {
                  // console.log('reult in function ', result);
                  return new Promise(function (resolve, reject) {
                    var re_data = [];
                    var result_length = result.length;
                    console.log("reult in promice ", result_length);
                    for (let j = 0; j < result.length; j++) {
                      re_data[j] = [];

                      re_data[j]["campaign_key"] = result[j].campaign_key;
                      re_data[j]["campaign_name"] = result[j].campaign_name;
                      re_data[j]["subjectofemail"] = result[j].subjectofemail;
                      re_data[j]["email_body"] = result[j].email_body;
                      var str = result[j].whomtosend;
                      // console.log("whom to send is fvjfvh : ", str);
                      // console.log(str);
                      // console.log(str.length);

                      if (str == "toall") {
                        // console.log('enter in toall if cond.');
                        re_data[j]["whomtosend"] = result[j].whomtosend;
                        result_length--;
                      } else {
                        var sql =
                          "SELECT `group_name` FROM `group_details` WHERE `group_key`='";
                        for (let i = 0; i < str.length; i++) {
                          if (i + 2 < str.length) {
                            sql = sql + str[i] + "' OR `group_key`='";
                          } else {
                            sql = sql + str[i] + "'";
                          }
                          i++;
                        }
                        console.log(sql);
                        databaseFetch(sql)
                          .then((group_str) => {
                            counter++;
                            // console.log("counter value is : ", counter);
                            re_data[j]["whomtosend"] = group_str;
                            if (counter == result_length) {
                              // console.log("enter in if condi. ", re_data);
                              resolve(re_data);
                            }
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }
                    }
                  });
                }

                resolveData(result)
                  .then((re_data) => {
                    console.log("resoveData .then condition ", re_data);
                    session_draft_details["draftdetails"] = re_data;
                    const data = session_draft_details;
                    res.render("campaigns/drafts.ejs", { data });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                session_draft_details["draftdetails"] = 0;
                const data = session_draft_details;
                res.render("campaigns/drafts.ejs", { data });
              }
            }
          }
        );
      }
    }
  );
});

module.exports = router;
