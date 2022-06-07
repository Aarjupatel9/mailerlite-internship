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
      return res.status(400).render("login.hbs", {
        message: "Please provide an email and password",
      });
    }

    con.query(
      `SELECT * FROM users_details WHERE email = '${emails}' `,
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          if (results.length > 0) {
            console.log(results);
            if (
              async (passwords) => {
                await bcrypt.compare(passwords, results[0].pass);
              }
            ) {
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
              res.status(401).render("login.hbs", {
                message: "Email or Password is incorrect",
              });
            }
          } else {
            res.status(401).render("login.hbs", {
              message: "Email or Password is incorrect",
            });
          }
        }
      }
    );
  } catch (error) {
    // console.log(error);
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
        return res.render("signup.hbs", {
          message: "That email is already in use",
        });
      } else if (passwords !== repasswords) {
        return res.render("signup.hbs", {
          message: "Passwords do not match",
        });
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
            return res.render("signup.hbs", {
              message: "User registered",
            });
          }
        }
      );
    }
  );
};

exports.isLoggedIn = async (req, res, next) => {
  console.log(req.cookies);
  if (req.cookies.jwt) {
    try {
      //1) verify the token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      console.log(decoded);
      //2) Check if the user still exists
      con.query(
        "SELECT * FROM users_details WHERE user_key = ?",
        [decoded.user_key],
        (error, result) => {
          console.log(result);
          if (!result) {
            req.isloggedin = 2;
            console.log("enter in not result");
            return next();
          }

          req.user = result[0];
          console.log("user is", req.user);
          console.log("user is", decoded.user_key);
          if (decoded.user_key) {
            console.log("enter in exit condition");
            req.isloggedin = 1;
            req.user_key = decoded.user_key;
            return next();
          } else {
            req.isloggedin = 0;
            res.redirect("/login");
            console.log("enter in undefined userkey cndition ");
            //  res.redirect("/login");
            var message = "hii";
            res.render("login.hbs", { message });
          }
        }
      );
    } catch (error) {
      req.isloggedin = 0;
      console.log("enter in catch error ");
      console.log(error);
      var message = "hii";
      res.render("login.hbs", { message });
    }
  } else {
    console.log("enter in cookiei not set  condition ");
    req.isloggedin = 0;
    var message = "hii";
    res.render("login.hbs", { message });
  }
};

exports.logout = async (req, res) => {
  res.cookie("jwt", "logout", {
    expires: new Date(Date.now()), //Date.now()+ 2 * 1000// some jwt error in this
    httpOnly: true,
  });
  res.status(200).redirect("/");
};
