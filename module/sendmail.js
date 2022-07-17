var nodemailer = require("nodemailer");
var con = require("./mysqlconn");
const dotenv = require("dotenv");
const res = require("express/lib/response");
dotenv.config({ path: "../.env" });

function emailsender(i, draftdetails, email, user_key, campaign_key) {
  console.log("emailsender inside");

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.OFFICIAL_EMAIL_ID,
      pass: process.env.OFFICIAL_EMAIL_ID_PASS,
    },
  });
  var mailOptions = {
    from: "travelagency3111@gmail.com",
    to: `${email}`,
    subject: `${draftdetails["subjectofemail"]}`,
    html: `${draftdetails["email_body"]}`,

  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent : " + info.response);
      console.log("enter in send email section , email is in progress");
      if (i == 0) {
        var campaign_update_query =
          "UPDATE `campaigns_details` SET `campaigns_status`='1' WHERE `user_key`= '" +
          user_key +
          "' AND `campaign_key`='" +
          campaign_key +
          "'";
        con.query(campaign_update_query, function (err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log("update query result : ", result);
          }
        });
      }
    }
  });
}

function sendEmailOfCampaigns(user_key, campaign_key) {
  console.log("send email  function inside", user_key, campaign_key);
  // return;
  //NOW WI HAVE TO FETCH DRAFT DETAILS FROM DATABASE THROUGH CAMPAIGN_KEY
  var draftdetails = [];
  const fetchingdraftdetails =
    "SELECT * FROM `campaigns_details` WHERE `campaign_key`='" +
    campaign_key +
    "'";
  con.query(fetchingdraftdetails, function (err, result, field) {
    if (err) {
      console.log(err);
    } else {
      console.log("result is :", result);
      draftdetails["campaign_name"] = result[0].campaign_name;
      draftdetails["campaign_type"] = result[0].campaign_type;
      draftdetails["subjectofemail"] = result[0].subjectofemail;
      draftdetails["whomtosend"] = result[0].whomtosend;
      draftdetails["email_body"] = result[0].email_body;

      console.log(draftdetails["whomtosend"]);
      if (draftdetails["whomtosend"] == "toall") {
        con.query(
          "SELECT * FROM `subscriber_of_users` WHERE `user_key`=" +
          user_key +
          "",
          function (err, result, fields) {
            if (err) {
              console.log(err);
            } else {
              console.log(result.length);
              for (let i = 0; i < result.length; i++) {
                var email = result[i].email;
                // console.log(email);
                console.log("subscriber's email id is : ", email);
                emailsender(i, draftdetails, email, user_key, campaign_key);
              }
            }
          }
        );
      } else {
        console.log("whomto send is : ", draftdetails["whomtosend"]);
        var str = draftdetails["whomtosend"];
        var sql =
          "SELECT * FROM `subscriber_of_users` WHERE `user_key`='" +
          user_key +
          "' and (`group_key`='";
        for (let i = 0; i < str.length; i++) {
          if (i + 2 < str.length) {
            sql = sql + str[i] + "' OR `group_key`='";
          } else {
            sql = sql + str[i] + "')";
          }
          i++;
        }

        console.log(sql);

        con.query(sql, function (err, result, field) {
          if (err) {
            console.log(err);
          } else {
            if (result.length > 0) {
              for (let i = 0; i < result.length; i++) {
                var email = result[i].email;
                console.log("email is ", result[i].email);
                emailsender(i, draftdetails, email, user_key, campaign_key);
              }
            }
            else {
              console.log('enter in , not subscriber condition');
              con.query("update `campaigns_details` set `campaigns_status`='1' where `campaign_key`='" + campaign_key + "'", function (err, result) {
                if (err) {
                  console.log(err);
                }
              })
            }
          }
        });
      }
    }
  });
}

module.exports = sendEmailOfCampaigns;
