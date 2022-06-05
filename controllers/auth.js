const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

var con = require("../module/mysqlconn");
con.connect(function (err) {
  if (err) console.log(err);
});

exports.login = async (req, res) => {
  try {
    const { emails, passwords } = req.body;
    console.log(emails, " ", passwords);
    if (!emails || !passwords) {
      return res.status(400).render('login', {
        message: 'Please provide an email and password'
      })
    }

    con.query('SELECT * FROM users WHERE email = ?', [emails], async (error, results) => {
      console.log(results);
      if (!results) {
        res.status(401).render('login', {
          message: 'database connection failed',
        })
      } else if (!(await bcrypt.compare(passwords, results[0].pass))) {
        res.status(401).render("login", {
          message: "Email or Password is incorrect",
        });
      } else {
        const id = results[0].id;

        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });

        console.log("The token is: " + token);

        const cookieOptions = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true,
        };

        res.cookie("jwt", token, cookieOptions);
        res.status(200).redirect("/");
      }

    })

  } catch (error) {
    console.log(error);
  }
}

exports.signup = (req, res) => {
  console.log(req.body);

  const { fname, lname, mono, emails, passwords, repasswords } = req.body;

  con.query('SELECT email FROM users WHERE email = ?', [emails], async (error, results) => {
    if (error) {
      console.log(error);
    }

    if (results.length > 0) {
      return res.render('signup', {
        message: 'That email is already in use'
      })
    } else if (passwords !== repasswords) {
      return res.render('signup', {
        message: 'Passwords do not match'
      });
    }

    let hashedPassword = await bcrypt.hash(passwords, 8);
    console.log(hashedPassword);

    con.query('INSERT INTO users SET ?', { fname: fname, lname: lname, mobno: mono, email: emails, pass: hashedPassword }, (error, results) => {
      if (error) {
        console.log(error);
      } else {
        console.log(results);
        return res.render('signup', {
          message: 'User registered'
        });
      }
    })


  });

}

exports.isLoggedIn = async (req, res, next) => {
  // console.log(req.cookies);
  if (req.cookies.jwt) {
    try {
      //1) verify the token
      const decoded = await promisify(jwt.verify)(req.cookies.jwt,
        process.env.JWT_SECRET
      );

      console.log(decoded);

      //2) Check if the user still exists
      con.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, result) => {
        console.log(result);

        if (!result) {
          return next();
        }

        req.user = result[0];
        console.log("user is")
        console.log(req.user);
        return next();

      });
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    next();
  }
}

exports.logout = async (req, res) => {
  res.cookie('jwt', 'logout', {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true
  });

  res.status(200).redirect('/');
}