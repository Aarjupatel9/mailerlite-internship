
const os = require("os");
const path = require("path");
const dotenv = require("dotenv");
var nodemailer = require("nodemailer");
var navigator = require("navigator");
const cookieParser = require("cookie-parser");
const session_storage = require("node-sessionstorage");
const { NULL } = require("mysql/lib/protocol/constants/types");

const authController = require("../controllers/auth");

// sagar's code


var express = require("express");
var router = express.Router();
var con = require("../module/mysqlconn");
var bodyParser = require("body-parser");
const { json } = require("express");
const { jsonp } = require("express/lib/response");
var cors = require("cors");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(cors());
/* GET form page. */
router.get("/", authController.isLoggedIn, function (req, res, next) {
    var name, email, c_name, user;

    con.query(
        "SELECT * FROM users_details WHERE `user_key`='" + req.user_key + "'",
        function (err, result, fields) {
            if (err) {
                console.log(err);
            } else {
                name = result[0].firstname + " " + result[0].lastname;
                email = result[0].email;
                c_name = result[0].companyname;
                user = {
                    name: `${name}`,
                    email: `${email}`,
                    c_name: `${c_name}`,
                    user_key: req.user_key
                };
            }
        }
    );
    // var user = {
    //     c_name: "sk indt.",
    //     email: "sagarnanera30@gmail.com",
    //     name: "sagar nanera"
    // };
    var sql = `SELECT * FROM forms WHERE user_key = ${req.user_key} ORDER BY form_id DESC;`;
    con.query(sql, (err, result) => {
        if (err) {
            throw err;
        }

        var sub_sql = 'SELECT t.form_id as form_id, COUNT(p.response_id) as `count` FROM forms t LEFT JOIN form_response p ON p.form_id = t.form_id WHERE t.user_key = ' + req.user_key + ' GROUP BY t.form_id ORDER BY `form_id` DESC;'
        con.query(sub_sql, (err, sub_count) => {
            if (err) {
                throw err;
            }
            console.log(sub_count)


            console.log(result);
            res.render("forms/form.ejs", { data: result, user_details: user, subscriber: sub_count });
        });
    });
});

router.get("/form_name", authController.isLoggedIn, function (req, res, next) {
    var name, email, c_name, user;

    con.query(
        "SELECT * FROM users_details WHERE `user_key`='" + req.user_key + "'",
        function (err, result, fields) {
            if (err) {
                console.log(err);
            } else {
                name = result[0].firstname + " " + result[0].lastname;
                email = result[0].email;
                c_name = result[0].companyname;
                user = {
                    name: `${name}`,
                    email: `${email}`,
                    c_name: `${c_name}`,
                };
                res.render("forms/form_name.ejs", { user_details: user });
            }
        }
    );
    // var user = {
    //     c_name: "sk indt.",
    //     email: "sagarnanera30@gmail.com",
    //     name: "sagar nanera"
    // };

});

router.post("/name", authController.isLoggedIn, urlencodedParser, function (req, res, next) {
    var date_1 = new Date();
    var date = new Date(date_1.getTime() + 3600000 * 5.5);

    var insert_sql = "INSERT INTO `forms` (`user_key`, `title`,`created_on`) VALUES ?;";
    var values = [[req.user_key, req.body.form_name, date.toUTCString()]];
    con.query(insert_sql, [values], function (err, result) {
        if (err) throw err;
        console.log("insert id: " + result.insertId);

        const form_id = result.insertId;

        res.redirect(307, "http://localhost:8080/form/" + form_id + "/form_group");
    });
});

router.post("/:form_id/form_group", authController.isLoggedIn, urlencodedParser, function (req, res, next) {
    var name, email, c_name, user;

    con.query(
        "SELECT * FROM users_details WHERE `user_key`='" + req.user_key + "'",
        function (err, result, fields) {
            if (err) {
                console.log(err);
            } else {
                name = result[0].firstname + " " + result[0].lastname;
                email = result[0].email;
                c_name = result[0].companyname;
                user = {
                    name: `${name}`,
                    email: `${email}`,
                    c_name: `${c_name}`,
                    form_id: req.params.form_id
                };
            }
        }
    );

    // var user = {
    //     c_name: "sk indt.",
    //     email: "sagarnanera30@gmail.com",
    //     name: "sagar nanera",
    //     form_id: req.params.form_id
    // };
    console.log(req.params.form_id);

    var sql = `SELECT  g.group_key,g.group_name,COUNT(f.response_id) AS subs FROM group_details g LEFT JOIN form_response f ON f.group_id LIKE CONCAT('%',g.group_key, '%') WHERE g.user_key = ${req.user_key} GROUP BY g.group_key;`;
    con.query(sql, (err, result) => {
        if (err) {
            throw err;
        }

        console.log({ result });
        res.render("forms/form_group.ejs", { data: result, user_details: user });
    });
});


router.post("/:form_id/submit_form_group", authController.isLoggedIn, urlencodedParser, function (
    req,
    res,
    next
) {
    console.log(req.params.form_id);

    var insert_sql =
        "UPDATE `forms` SET `group_key` = '" +
        req.body.Group +
        "' WHERE `forms`.`form_id` = " +
        req.params.form_id;

    con.query(insert_sql, function (err, result) {
        if (err) throw err;
        console.log("result: " + { result });
    });

    res.redirect(
        307,
        "http://localhost:8080/form/" + req.params.form_id + "/create_form"
    );
});

router.post("/:form_id/create_form", authController.isLoggedIn, urlencodedParser, function (
    req,
    res,
    next
) {
    console.log(req.params.form_id);
    var sql =
        "SELECT `formSchema` FROM `forms` WHERE `form_id`= " + req.params.form_id;
    con.query(sql, function (err, result) {
        if (err) throw err;

        console.log(JSON.stringify(result[0].formSchema));

        // res.sendStatus(200);
        res.render("forms/create_forms.ejs", {
            data: result[0].formSchema,
            form_id: req.params.form_id,
            user: req.user_key
        });
    });
});

router.post("/:form_id/save_form", authController.isLoggedIn, urlencodedParser, function (req, res, next) {
    console.log(req.params.form_id);
    console.log(req.body.formSchema);

    var sql =
        "UPDATE `forms` SET `formSchema` = '" +
        req.body.formSchema +
        "' WHERE `forms`.`form_id` = " +
        req.params.form_id;

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        res.send("success");
    });
});

router.post("/delete", authController.isLoggedIn, urlencodedParser, function (req, res, next) {
    var sql = "DELETE FROM `forms` WHERE `forms`.`form_id` = " + req.body.form_id;
    console.log(sql);
    con.query(sql, (err, result) => {
        if (err) {
            throw err;
        }

        console.log({ result });

        res.sendStatus(200);
    });
});

router.post("/preview", authController.isLoggedIn, urlencodedParser, function (req, res, next) {
    var sql =
        "SELECT formSchema FROM `forms` WHERE `form_id`=" + req.body.form_id;
    con.query(sql, (err, result) => {
        if (err) {
            throw err;
        }

        res.status(200).send(result);
    });
});


// groups aactions
router.post("/create_group", authController.isLoggedIn, urlencodedParser, function (req, res, next) {

    var sql = "INSERT INTO `group_details` (`user_key`, `group_name`) VALUES ?";

    var values = [[req.user_key, req.body.group_name]];
    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        res.sendStatus(200);
    });

});




router.get('/:form_id/form_overview', authController.isLoggedIn, function (req, res, next) {

    var name, email, c_name, user;

    con.query(
        "SELECT * FROM users_details WHERE `user_key`='" + req.user_key + "'",
        function (err, result, fields) {
            if (err) {
                console.log(err);
            } else {
                name = result[0].firstname + " " + result[0].lastname;
                email = result[0].email;
                c_name = result[0].companyname;
                user = {
                    name: `${name}`,
                    email: `${email}`,
                    c_name: `${c_name}`,
                    user_key: req.user_key
                };
            }
        }
    );
    // var user = {
    //     c_name: "sk indt.",
    //     email: "sagarnanera30@gmail.com",
    //     name: "sagar nanera"
    // };


    var sql = 'SELECT * FROM `forms` WHERE form_id = ' + req.params.form_id;;
    con.query(sql, (err, result) => {
        if (err) {
            throw err;
        }

        var group_keys = result[0].group_key.split(',');
        console.log(group_keys);

        var group_sql = `SELECT g.group_key,g.group_name,COUNT(f.response_id) AS subs FROM group_details g LEFT JOIN form_response f ON f.group_id LIKE CONCAT('%',g.group_key, '%') WHERE g.user_key = ${req.user_key} && g.group_key IN (${group_keys}) GROUP BY g.group_key;`;

        con.query(group_sql, (err, group_details) => {
            if (err) {
                throw err;
            }
            console.log(group_details)

            console.log(result);
            // res.render("form", { data: result, user_details: user });
            res.render('forms/form_overview.ejs', { user_details: user, data: result, groups: group_details });
        });
    });
});


// form url handler
router.get('/:form_id/share', authController.isLoggedIn, function (req, res, next) {

    var sql = 'SELECT * FROM `forms` WHERE form_id = ' + req.params.form_id;;
    con.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        // res.render("form", { data: result, user_details: user });
        res.render('forms/share_form.ejs', { data: result, user: req.user_key });
    });
});



// edit groups
router.post("/:form_id/group_edit", authController.isLoggedIn, urlencodedParser, function (req, res, next) {
    var name, email, c_name, user;

    con.query(
        "SELECT * FROM users_details WHERE `user_key`='" + req.user_key + "'",
        function (err, result, fields) {
            if (err) {
                console.log(err);
            } else {
                name = result[0].firstname + " " + result[0].lastname;
                email = result[0].email;
                c_name = result[0].companyname;
                user = {
                    name: `${name}`,
                    email: `${email}`,
                    c_name: `${c_name}`,
                    form_id: req.params.form_id
                };
            }
        }
    );
    // var user = {
    //     c_name: "sk indt.",
    //     email: "sagarnanera30@gmail.com",
    //     name: "sagar nanera",
    //     form_id: req.params.form_id
    // };
    console.log(req.params.form_id);

    var sql =
        `SELECT  g.group_key,g.group_name,COUNT(f.response_id) AS subs FROM group_details g LEFT JOIN form_response f ON f.group_id LIKE CONCAT('%',g.group_key, '%') WHERE g.user_key = ${req.user_key} GROUP BY g.group_key;`;
    con.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }

        console.log({ rows });
        res.render("forms/group_edit.ejs", { data: rows, user_details: user });
    });
});

// save edited groups
router.post("/:form_id/save_edit", authController.isLoggedIn, urlencodedParser, function (
    req,
    res,
    next
) {
    console.log(req.params.form_id);

    var insert_sql =
        "UPDATE `forms` SET `group_key` = '" +
        req.body.Group +
        "' WHERE `forms`.`form_id` = " +
        req.params.form_id;

    con.query(insert_sql, function (err, result) {
        if (err) throw err;
        console.log("result: " + { result });
    });

    res.redirect(
        "http://localhost:8080/form/" + req.params.form_id + "/form_overview"
    );
});

module.exports = router;
