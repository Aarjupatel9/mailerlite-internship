// var nodemailer = require("nodemailer");

// function emailsender() {
//   var transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "travelagency3111@gmail.com",
//       pass: "ovuecqzzniieiynd",
//     },
//   });
//   var mailOptions = {
//     from: "travelagency3111@gmail.com",
//     to: "aarjupatel922003@gmail.com",
//     subject: "test email template",
//     text: `hello bvbxvxvbn  \n <b>helloo</b> \n\n\n\t\t <b>helloo</b>\n <b>helloo</b>\n <b>helloo</b>`,
//   };
//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent : " + info.response);

//     }
//   });
// }
// console.log('start');
// emailsender();
// console.log('end');

"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    // auth: {
    //   user: testAccount.user, // generated ethereal user
    //   pass: testAccount.pass, // generated ethereal password
    // },
    service: "gmail",
    auth: {
      user: "travelagency3111@gmail.com",
      pass: "ovuecqzzniieiynd",
    },
  });

  // send mail with defined transport object

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <travelagency3111@gmail.com>', // sender address
    to: '"aarju patel " <aarjupatel922003@gmail.com>', // list of receivers
    subject: "Hello ✔", // Subject line
    attachments: [
      {
        path: "src/try.html",
      },
      {
        filename: "avatar.png",
        path: "public/avatar.png",
        cid: "avatar.png", //same cid value as in the html img src
      },
    ],

    // text: "Hello world?", // plain text body
   
    html: `&nbsp;<div class="text-field text-center" id="appenden-text_area">
            <textarea name="text-area2" class="text-area" cols="25" rows="3" placeholder="enter text here"></textarea>
        </div>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  console.log("info is : ", info);
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
console.log("Hello ✔", "Fred Foo 👻");
