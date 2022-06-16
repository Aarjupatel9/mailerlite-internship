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
    html: `
<body style="background-color: #333;">
<img style="width:250px;height:300px;"  src="cid:avatar.png" alt="nothing to display">
 
    <div class="sidebar d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auhref text-white text-decoration-none">
            <svg class="bi me-2" width="40" height="32">
                <use href="/"></use>
            </svg>
            <span class="fs-4 my-3">Mailerlite</span>
        </a>
        <hr />
        <ul class="nav nav-pills flex-column mb-auhref">
            <li class="nav-item">
                <a href="#" class="nav-link text-white" aria-current="page">
                    <svg class="bi me-2" width="16" height="16">
                        <use href="#home"></use>
                    </svg>
                    Dashboard
                </a>
            </li>
            <li>
                <a href="/Campaigns" class="nav-link text-white">
                    <svg class="bi me-2" width="16" height="16">
                        <use href="#speedometer2"></use>
                    </svg>
                    Campaigns
                </a>
            </li>
            <li>
                <a href="#" class="nav-link text-white">
                    <svg class="bi me-2" width="16" height="16">
                        <use href="#table"></use>
                    </svg>
                    Subscribers
                </a>
            </li>
            <li>
                <a href="#" class="nav-link text-white">
                    <svg class="bi me-2" width="16" height="16">
                        <use heef="#grid"></use>
                    </svg>
                    Forms
                </a>
            </li>
            <li>
                <a href="#" class="nav-link text-white">
                    <svg class="bi me-2" width="16" height="16">
                        <use href="#people-circle"></use>
                    </svg>
                    Sites
                </a>
            </li>
            <li>
                <a href="#" class="nav-link text-white">
                    <svg class="bi me-2" width="16" height="16">
                        <use href="#people-circle"></use>
                    </svg>
                    Auhrefmation
                </a>
            </li>
            <br />
            <br />
            <li>
                <a href="#" class="nav-link text-white">
                    <svg class="bi me-2" width="16" height="16">
                        <use href="#people-circle"></use>
                    </svg>
                    Account Settings
                </a>
            </li>
            <li>
                <a href="#" class="nav-link text-white">
                    <svg class="bi me-2" width="16" height="16">
                        <use href="#people-circle"></use>
                    </svg>
                    Intigration
                </a>
            </li>
            <li>
                <a href="#" class="nav-link text-white">
                    <svg class="bi me-2" width="16" height="16">
                        <use href="#people-circle"></use>
                    </svg>
                    File Manager
                </a>
            </li>
            <li>
                <a href="#" class="nav-link text-white">
                    <svg class="bi me-2" width="16" height="16">
                        <use href="#people-circle"></use>
                    </svg>
                    My Tamplates
                </a>
            </li>
        </ul>

        <hr />
    </div>




    <!-- bootstrap code -->

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossorigin="anonymous"></script>
</body>
`, // html body
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
