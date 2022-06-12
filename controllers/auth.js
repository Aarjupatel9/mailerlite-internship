const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");

var con = require("../module/mysqlconn_deven");
const { decode } = require("punycode");
con.connect(function (err) {
  if (err) console.log(err);
});

exports.login = async (req, res) => {
  try {
    const { emails, passwords } = req.body;
    // console.log(req.body.emails);
    // console.log(emails);
    if (!emails || !passwords) {
      var data = [];
      data['message'] = 0;
      return res.status(400).render("auth/login.ejs", { data });
    }

    con.query(
      `SELECT * FROM users_details WHERE email = '${emails}' `,
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          if (results.length > 0) {
            // console.log(results);
            if (
              async (passwords) => {
                await bcrypt.compare(passwords, results[0].pass);
              }
            ) {
              console.log("oassword is ", passwords);
              console.log("oassword is ", results[0].pass);
              console.log("login successful");
              const user_key = results[0].user_key;
              const token = jwt.sign({ user_key }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
              });
              console.log("The token is: " + token);
              const cookieOptions = {
                expires: new Date(
                  Date.now() +
                    process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                ),
                httpOnly: true,
              };
              res.cookie("jwt", token, cookieOptions);
              res.status(200).redirect("/");
            } else {
              var data = [];
              data["message"] = 1 ;
              res.status(401).render("auth/login.ejs", { data });
            }
          } else {
            var data = [];
            data["message"] = 2;
            res.status(401).render("auth/login.ejs", { data });
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.signup = (req, res) => {
  console.log(req.body);

  const { fname, lname, mono, emails, companyname, passwords, repasswords } =
    req.body;

  con.query(
    "SELECT email FROM `users_details` WHERE email = ?",
    [emails],
    async (error, results) => {
      if (error) {
        console.log(error);
      }

      if (results.length > 0) {
        var data = [];
            data["message"] = 2;
        return res.render("auth/signup.ejs", { data });
      } else if (passwords !== repasswords) {
        var data = [];
        data["message"] = 0;
        return res.render("auth/signup.ejs", { data });
      }

      let hashedPassword = await bcrypt.hash(passwords, 8);
      console.log(hashedPassword);

      con.query(
        "INSERT INTO `users_details` SET ?",
        {
          firstname: fname,
          lastname: lname,
          companyname: companyname,
          phonenumber: mono,
          email: emails,
          pass: hashedPassword,
        },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            console.log(results);
            var data = [];
            data["message"] = 1;
            return res.render("auth/signup.ejs", { data });
          }
        }
      );
    }
  );
};

exports.isLoggedIn = async (req, res, next) => {
  // console.log(req.cookies);
  if (req.cookies.jwt) {
    try {
      //1) verify the token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      // console.log(decoded);
      //2) Check if the user still exists
      con.query(
        "SELECT * FROM users_details WHERE user_key = ?",
        [decoded.user_key],
        (error, result) => {
          // console.log(result);
          if (!result) {
            req.isloggedin = 2;
            console.log("enter in not result");
            return next();
          }

          req.user = result[0];
          // console.log("user is", req.user);
          console.log("user is", decoded.user_key);
          if (decoded.user_key) {
            console.log("enter in exist login condition");
            req.isloggedin = 1;
            req.user_key = decoded.user_key;
            return next();
          } else {
            req.isloggedin = 0;
            res.redirect("/login");
            console.log("enter in undefined userkey cndition ");
            //  res.redirect("/login");
            var data = [];
            data["message"] = 4;
            res.render("auth/login.ejs", { data });
          }
        }
      );
    } catch (error) {
      req.isloggedin = 0;
      console.log("enter in catch error ");
      // console.log(error);
      var data = [];
      data["message"] = 4;
      res.render("auth/login.ejs", { data });
    }
  } else {
    console.log("enter in cookiei not set  condition ");
    req.isloggedin = 0;
    var data = [];
    data["message"] = "4";
    res.render("auth/login.ejs", { data });
  }
};

exports.logout = async (req, res) => {
  res.cookie("jwt", "logout", {
    expires: new Date(Date.now()), //Date.now()+ 2 * 1000// some jwt error in this
    httpOnly: true,
  });
  res.status(200).redirect("/");
};
