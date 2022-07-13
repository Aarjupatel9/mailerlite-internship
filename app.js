var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var bodyParser = require('body-parser');
var con = require("./module/mysqlconn");
var port = 5000;



var urlencodedParser = bodyParser.urlencoded({ extended: false })

var indexRouter = require('./routes/index');

var formRouter = require('./routes/forms/form');


const { json } = require('express/lib/response');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('assets', path.join(__dirname, 'assets'));
app.set('view engine', 'ejs');



app.use(cors());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/static', express.static(path.join(__dirname, 'assets')))

app.use('/', indexRouter);
app.use('/form', formRouter);


// form response...........

app.post('/:form_id/form_response', urlencodedParser, async function (req, res, next) {

  var sql_group = 'SELECT `group_key` FROM `forms` WHERE `form_id` = ' + req.params.form_id;
  con.query(sql_group, function (err, result) {
    if (err) throw err;
    console.log("result ", result);

    group_keys = result[0].group_key;

    const values = [
      form_id = req.params.form_id,
      group_key = group_keys,
      fname = req.body.fname,
      lname = req.body.lname,
      Email = req.body.email,
      Mobno = req.body.mob_no,
      Company = req.body.company_name,
      City = req.body.city,
      State = req.body.state,
      ZIP = req.body.zip,
      Country = req.body.country
    ]
    console.log(req.params.form_id);
    var sql =
      'INSERT INTO `form_response`(`form_id`, `group_id`, `Fname`, `Lname`, `Email`, `Mobno`, `Company`, `City`, `State`, `ZIP`, `Country`) VALUES (?)';

    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
      // res.send("success");
      res.sendStatus(200);
    });

  });



});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, function () {
  // console.log(path.join(__dirname, 'views'))
  console.log(`server started at http://localhost:${port}`)
});