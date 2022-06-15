var nodemailer = require("nodemailer");
var con = require("./mysqlconn");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

con.connect(function (err) {
  if (err) {
    console.log(err);
  }
});

function emailsender(i,draftdetails, email, user_key, campaign_key) {
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
      text: `${draftdetails["email_body"]}`,
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
        //we have to find user key of the user from database but now declare statisllyu here
        //req.user_key; //for user travelagency3111@gmail.com
        //fetch the subscribers email from database
        con.query(
          "SELECT * FROM `subscriber_of_users` WHERE `user_key`=" +
            user_key +
            "",
          function (err, result, fields) {
            if (err) {
              console.log(err);
            } else {
              // console.log(result);
              for (let i = 0; i < result.length; i++) {
                var email = result[i].email;
                console.log("subscriber's email id is : ", email);
                // //sending email to subscribers
                //   console.log("email id is ", process.env.OFFICIAL_EMAIL_ID);
                //   console.log("email id is ", process.env.OFFICIAL_EMAIL_ID_PASS);

                  emailsender(i,draftdetails, email,user_key,campaign_key);
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
        con.query(sql, function (err, result, field) {
          if (err) {
            console.log(err);
          } else {
              for (let i = 0; i < result.length; i++) {
                  var email = result[i].email;
                console.log("email is ", result[i].email);
                emailsender(i, draftdetails, email, user_key,campaign_key);
            }
          }
        });
      }
    }
  });
}

module.exports = sendEmailOfCampaigns;
