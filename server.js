//here we declare some variable alias
// for draft 0, sent 1 ,  outbox 2 , send_later 3, super-admin 4

const express = require("express");
const os = require("os");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

var bodyParser = require("body-parser");
var urlencodedparser = bodyParser.urlencoded({ extended: false });
const authController = require("./controllers/auth.js");

const app = express();

var con = require("./module/mysqlconn");
var sendEmailOfCampaigns = require("./module/sendmail");
con.connect(function (err) {
  if (err) {
    console.log(err);
  }
});

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
app.use("/campaigns", require("./routes/campaign_router"));
app.use("/subscribers", require("./routes/subscribers_router"));
app.use("/form", require("./routes/forms_router"));

//experimental area

app.post("/login", urlencodedparser, authController.login);
app.get("/login", (req, res) => {
  var message = "hii";
  res.render("auth/login.hbs", { message });
});

app.post("/signup", urlencodedparser, authController.signup);
app.get("/signup", (req, res) => {
  var data = [];
  data["message"] = 5;
  return res.render("auth/signup.ejs", { data });
});

app.get("/logout", authController.logout);
app.get("/profile", authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.render("auth/profile.hbs", {
      user: req.user,
    });
  } else {
    res.redirect("/login");
  }
});

//function use in the app


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

app.post(
  "/cancel-set-campaign",
  authController.isLoggedIn,
  urlencodedparser,
  (req, res) => {
    console.log("enter in api");
    const user_key = req.user_key;
    var campaign_key = req.body.campaign_key;

    //now we will remove it from outbox and set as draft

    var removefromoutboxquery =
      "UPDATE  `campaigns_details` SET `campaigns_status`= '0',`timeofsend`='',`timeofscheduled`='' WHERE `user_key`='" +
      user_key +
      "' AND `campaign_key` ='" +
      campaign_key +
      "' ";

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
);

app.post(
  "/Remove-Draft",
  authController.isLoggedIn,
  urlencodedparser,
  (req, res) => {
    console.log("enter in api");
    const user_key = req.user_key;
    const campaign_key = req.body.campaign_key;

    //now we will remove it from draft box
    var removefromdraftboxquery =
      "DELETE FROM `campaigns_details` WHERE `campaigns_status`='0' AND `campaign_key` ='" +
      campaign_key +
      "' ";
    con.query(removefromdraftboxquery, function (err, result) {
      if (err) {
        res.send({ response_status: "0" });
        console.log(err);
      } else {
        res.send({ response_status: "1" });
        console.log(
          "remove query from remove draft - affect row: ",
          result.affectedRows
        );
      }
    });
  }
);

// universal endpoints for the web-app

app.get("/", authController.isLoggedIn, (req, res) => {
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
        // console.log(session_draft_details);
        const data = session_draft_details;
        res.render("home/home.ejs", { data });
      }
    }
  );
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
  // console.log("enter in 404 error page");
  res.sendFile(`${ERRORFILEPATH}/error404.html`);
});

app.listen(port, () => {
  console.log(`app start at port ${port}`);
  //at start the server the remaining(previouslly unsent which is
  //in outbox due to server failure(crash)) email
  // must be sent at their time
  //this functionality is define here at server start functionx
  con.query(
    "SELECT * FROM `campaigns_details` WHERE `campaigns_status` = '2'",
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

          const user_key = result[i].user_key;
          const campaign_key = result[i].campaign_key;

          // console.log(cdetails);
          if (timer) {
            setTimeout(() => {
              console.log("settime function inside at server starrt");
              sendEmailOfCampaigns(user_key, campaign_key);
            }, timer);
          } else {
            console.log("timer error at starting");
          }
        }
      }
    }
  );
});
