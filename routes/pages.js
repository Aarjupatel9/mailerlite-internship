const express = require('express');
const authController = require('../controllers/auth');
var con = require("../module/mysqlconn");
con.connect(function (err) {
  if (err) console.log(err);
});

const router = express.Router();

router.get("/", authController.isLoggedIn, (req, res) => {
  // console.log("enrter in / page ")
  // con.query("SELECT * FROM subscriber_details", function (err, result, fields) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     name = result[0].firstname + " " + result[0].lastname;
  //     email = result[0].email;
  //     c_name = result[0].companyname;
  //     const data = {
  //       name: `${name}`,
  //       email: `${email}`,
  //       c_name: `${c_name}`,
  //       // dbrowser:`${detectBrowser()}`
  //     };
  //     // console.log(data);
  //     res.render("home/home.ejs", { data });
  //   }
  // });
  res.render("index", {
    user: req.user,
  });
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/profile', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if( req.user ) {
    res.render('profile', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }
  
})

module.exports = router;