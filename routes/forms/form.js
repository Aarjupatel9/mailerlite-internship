var express = require("express");
var router = express.Router();
var con = require("../../module/mysqlconn");
var bodyParser = require("body-parser");
const { json } = require("express");
const { jsonp } = require("express/lib/response");
var cors = require("cors");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(cors());
/* GET form page. */
router.get("/", function (req, res, next) {

    var user = {
        c_name: "sk indt.",
        email: "sagarnanera30@gmail.com",
        name: "sagar nanera"
    };
    var sql = "SELECT * FROM `forms` WHERE user_key = 10000008 ORDER BY `form_id` DESC;";
    con.query(sql, (err, result) => {
        if (err) {
            throw err;
        }

        var sub_sql = 'SELECT t.form_id as form_id, COUNT(p.response_id) as `count` FROM forms t LEFT JOIN form_response p ON p.form_id = t.form_id WHERE t.user_key = ' + 10000008 + ' GROUP BY t.form_id ORDER BY `form_id` DESC;'
        con.query(sub_sql, (err, sub_count) => {
            if (err) {
                throw err;
            }
            console.log(sub_count)


            console.log(result);
            res.render("form", { data: result, user_details: user, subscriber: sub_count });
        });
    });
});

router.get("/form_name", function (req, res, next) {

    var user = {
        c_name: "sk indt.",
        email: "sagarnanera30@gmail.com",
        name: "sagar nanera"
    };
    res.render("form_name", { user_details: user });
});

router.post("/name", function (req, res, next) {
    var date_1 = new Date();
    var date = new Date(date_1.getTime() + 3600000 * 5.5);

    var insert_sql = "INSERT INTO `forms` (`user_key`, `title`,`created_on`) VALUES ?;";
    var values = [[10000008, req.body.form_name, date.toUTCString()]];
    con.query(insert_sql, [values], function (err, result) {
        if (err) throw err;
        console.log("insert id: " + result.insertId);

        const form_id = result.insertId;

        res.redirect(307, "http://localhost:5000/form/" + form_id + "/form_group");
    });
});

router.post("/:form_id/form_group", urlencodedParser, function (req, res, next) {
    var user = {
        c_name: "sk indt.",
        email: "sagarnanera30@gmail.com",
        name: "sagar nanera",
        form_id: req.params.form_id
    };
    console.log(req.params.form_id);

    var sql = `SELECT  g.group_key,g.group_name,COUNT(f.response_id) AS subs FROM group_details g LEFT JOIN form_response f ON f.group_id LIKE CONCAT('%',g.group_key, '%') WHERE g.user_key = ${10000008} GROUP BY g.group_key;`;
    con.query(sql, (err, result) => {
        if (err) {
            throw err;
        }

        console.log({ result });
        res.render("form_group", { data: result, user_details: user });
    });
});


router.post("/:form_id/submit_form_group", urlencodedParser, function (
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
        "http://localhost:5000/form/" + req.params.form_id + "/create_form"
    );
});

router.post("/:form_id/create_form", urlencodedParser, function (
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
        res.render("create_forms", {
            data: result[0].formSchema,
            form_id: req.params.form_id
        });
    });
});

router.post("/:form_id/save_form", urlencodedParser, function (req, res, next) {
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

router.post("/delete", urlencodedParser, function (req, res, next) {
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

router.post("/preview", urlencodedParser, function (req, res, next) {
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
router.post("/create_group", urlencodedParser, function (req, res, next) {

    var sql = "INSERT INTO `group_details` (`user_key`, `group_name`) VALUES ?";

    var values = [[req.body.user_key, req.body.group_name]];
    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        res.sendStatus(200);
    });

});
module.exports = router;



router.get('/:form_id/form_overview', function (req, res, next) {
    var user = {
        c_name: "sk indt.",
        email: "sagarnanera30@gmail.com",
        name: "sagar nanera"
    };


    var sql = 'SELECT * FROM `forms` WHERE form_id = ' + req.params.form_id;;
    con.query(sql, (err, result) => {
        if (err) {
            throw err;
        }

        var group_keys = result[0].group_key.split(',');
        console.log(group_keys);

        var group_sql = `SELECT g.group_key,g.group_name,COUNT(f.response_id) AS subs FROM group_details g LEFT JOIN form_response f ON f.group_id LIKE CONCAT('%',g.group_key, '%') WHERE g.user_key = ${10000008} && g.group_key IN (${group_keys}) GROUP BY g.group_key;`;

        con.query(group_sql, (err, group_details) => {
            if (err) {
                throw err;
            }
            console.log(group_details)

            console.log(result);
            // res.render("form", { data: result, user_details: user });
            res.render('form_overview', { user_details: user, data: result, groups: group_details });
        });
    });
});


// form url handler
router.get('/:form_id/share', function (req, res, next) {

    var sql = 'SELECT * FROM `forms` WHERE form_id = ' + req.params.form_id;;
    con.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        // res.render("form", { data: result, user_details: user });
        res.render('share_form', { data: result });
    });
});



// edit groups
router.post("/:form_id/group_edit", urlencodedParser, function (req, res, next) {
    var user = {
        c_name: "sk indt.",
        email: "sagarnanera30@gmail.com",
        name: "sagar nanera",
        form_id: req.params.form_id
    };
    console.log(req.params.form_id);

    var sql =
        `SELECT  g.group_key,g.group_name,COUNT(f.response_id) AS subs FROM group_details g LEFT JOIN form_response f ON f.group_id LIKE CONCAT('%',g.group_key, '%') WHERE g.user_key = ${10000008} GROUP BY g.group_key;`;
    con.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }

        console.log({ rows });
        res.render("group_edit", { data: rows, user_details: user });
    });
});

// save edited groups
router.post("/:form_id/save_edit", urlencodedParser, function (
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
        "http://localhost:5000/form/" + req.params.form_id + "/form_overview"
    );
});