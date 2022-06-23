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
const { request } = require("http");

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

//deven
router.post(
  "/addgroup",
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
          res.render("subscribers/addgroup.ejs", { data });
        }
      }
    );
  }
);

router.post(
  "/addgroupapi",
  authController.isLoggedIn,
  urlencodedparser,
  (req, res) => {
    con.query(
      "INSERT INTO `group_details`( `user_key`,`group_name`) VALUES ('" +
        req.user_key +
        "','" +
        req.body.group_name +
        "')",
      function (err, result) {
        if (err) {
          res.send({ response_status: "0" });
          console.log(err);
        } else {
          res.send({ response_status: "1" });
        }
      }
    );
  }
);

router.post(
  "/addsubs",
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

          con.query(
            // "SELECT * FROM `subscriber_of_users` INNER JOIN `group_details` ON `subscriber_of_users`.`user_key` = `group_details`.`user_key`  WHERE `subscriber_of_users`.`user_key`='" + req.user_key + "'",
            "SELECT * FROM `group_details` WHERE `user_key`='" +
              req.user_key +
              "'",
            function (err, result) {
              if (err) {
                console.log(err);
              } else {
                console.log(result);
                //gp1 = result[0].group_name;
                const data = session_draft_details;
                data["groupdata"] = result;
                var response_status = 3;
                // console.log(session_draft_details);
                res.render("subscribers/addsubs.ejs", { data , response_status });
              }
            }
          );
        }
      }
    );
  }
);

router.post(
  "/addsubsapi",
  authController.isLoggedIn,
  urlencodedparser,
  (req, res) => {
    var group_name;
    const smn = req.body.groupsname;
    console.log("snm is : ", smn);

    console.log("checkbox value is : ", smn, " and length is  : ", smn.length);
    if (smn[0].length === 3) {
      var j_object = [];
      for (let i = 0; i < smn.length; i++) {
        j_object[i] = smn[i][1];
      }
      console.log(j_object);
      group_name = j_object;
    } else {
      console.log("enter in length is not 3 cond.");
      group_name = smn[1];
    }
    // console.log("group name in api is : ", req.body.groupsname);
    console.log("group name in api is : ", group_name);

    con.query(
      "INSERT INTO `subscriber_of_users`( `user_key`, `group_key`, `firstname`, `lastname`, `email`, `phonenumber`) VALUES ('" +
        req.user_key +
        "','" +
        group_name +
        "','" +
        req.body.firstname +
        "','" +
        req.body.lastname +
        "','" +
        req.body.email +
        "','" +
        req.body.mobile +
        "')",
      function (err, result) {
        if (err) {
          var response_status = 0;
          console.log(err);
        } else {
          var response_status = 1;
          var name, email, c_name;
          con.query(
            "SELECT * FROM users_details WHERE `user_key`='" +
              req.user_key +
              "'",
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

                con.query(
                  // "SELECT * FROM `subscriber_of_users` INNER JOIN `group_details` ON `subscriber_of_users`.`user_key` = `group_details`.`user_key`  WHERE `subscriber_of_users`.`user_key`='" + req.user_key + "'",
                  "SELECT * FROM `group_details` WHERE `user_key`='" +
                    req.user_key +
                    "'",
                  function (err, result) {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log(result);
                      //gp1 = result[0].group_name;
                      const data = session_draft_details;
                      data["groupdata"] = result;
                      // console.log(session_draft_details);
                      res.render("subscribers/addsubs.ejs", { data , response_status});
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }
);

router.get("/allsubs", authController.isLoggedIn, (req, res) => {
  console.log("enrter in / page ");
  console.log(req.isloggedin, " ", req.user_key);
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
        con.query(
          "SELECT * FROM `subscriber_of_users` WHERE `user_key`='" +
            req.user_key +
            "'",
          function (err, result1, fields) {
            if (err) {
              console.log(err);
            } else {
              if (result1.length > 0) {
                const data = session_draft_details;
                data["result"] = result1;
                res.render("subscribers/allsubs.ejs", { data });
                console.log(result1[0].email);
              } else {
                const data = session_draft_details;
                data["result"] = 0;
                res.render("subscribers/allsubs.ejs", { data });
              }
            }
          }
        );
        // console.log(session_draft_details);
      }
    }
  );
});

router.post(
  "/subdetail",
  authController.isLoggedIn,
  urlencodedparser,
  (req, res) => {
    console.log("enrter in / page ");
    console.log(req.isloggedin, " ", req.user_key);
    console.log(req.body.email);
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
          con.query(
            "SELECT * FROM `subscriber_of_users` WHERE `email`='" +
              req.body.email +
              "' `user_key`='" +
              req.user_key +
              "'",
            function (err, result1, fields) {
              if (err) {
                console.log(err);
              } else {
                if (result1.length > 0) {
                  //ghghg
                  const data = session_draft_details;
                  data["result"] = result1;
                  res.render("subscribers/subdetail.ejs", { data });
                  console.log(result1[0].email);
                } else {
                  const data = session_draft_details;
                  data["result"] = 0;
                  res.render("subscribers/subdetail.ejs", { data });
                }
              }
            }
          );
          // console.log(session_draft_details);
        }
      }
    );
  }
);

router.post("/group", authController.isLoggedIn, (req, res) => {
  console.log("enrter in / page ");
  console.log(req.isloggedin, " ", req.user_key);
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
          // dbrowser:`${detectBrowser()}`
        };
        con.query(
          "SELECT * FROM `group_details` WHERE `user_key`='" +
            req.user_key +
            "'",
          function (err, result1, fields) {
            if (err) {
              console.log(err);
            } else {
              if (result1.length > 0) {
                console.log();
                var group_d = [];
                var group_d_length = result1.length;
                for (let i = 0; i < result1.length; i++) {
                  group_d[i] = [];
                  group_d[i]["groupcounter"] = 0;
                  group_d[i]["group_key"] = result1[i].group_key;
                  group_d[i]["group_name"] = result1[i].group_name;
                }
                console.log("before", group_d);
                var sqlquery =
                  "select * from `subscriber_of_users` where `user_key`='" +
                  user_key +
                  "'";
                con.query(sqlquery, function (err, result2) {
                  if (err) {
                    console.log(err);
                  } else {

                    console.log("result2 is", result2);
                    
                    for (let i = 0; i < result2.length; i++) {
                      var group = result2[i].group_key; ///1,4
                      console.log("geoup is ", group);
                      for (let i = 0; i < group.length; i++) {
                        console.log("group i ", group[i], " ", group_d_length);
                        if (group[i] != ",") {
                          for (let j = 0; j < group_d_length; j++) {
                            console.log("gp key is ", group_d[j]["group_key"]);
                            if (group[i] == group_d[j]["group_key"]) {
                              group_d[j]["groupcounter"]++;
                            }
                          }
                        }
                      }
                    }
                    console.log("grop_d : ", group_d);
                    const data = session_draft_details;
                    data["result"] = result1;
                    res.render("subscribers/group.ejs", { data, group_d });
                    console.log(result1[0].email);
                  }
                });
              } else {
                const data = session_draft_details;
                data["result"] = 0;
                res.render("subscribers/group.ejs", { data });
              }
            }
          }
        );
        // console.log(session_draft_details);
      }
    }
  );
});

//deven
module.exports = router;
