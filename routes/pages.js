const express = require("express");
const authController = require("../controllers/auth");
var con = require("../module/mysqlconn");
con.connect(function (err) {
  if (err) console.log(err);
});

const router = express.Router();

router.get("/", authController.isLoggedIn, (req, res) => {
  console.log("enrter in / page ");
  
  var user = [];
  user["access"] = 1;
  res.render("index.ejs", { user });
});

router.get("/signup", (req, res) => {
  var message = "hii";
  res.render("signup.ejs", { message });
});

router.get("/login", (req, res) => {
  var message = "hii";
  res.render("login.hbs", { message });
});

router.get("/profile", authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.render("profile.hbs", {
      user: req.user,
    });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
