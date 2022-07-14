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
    // attachments: [
    //   {
    //     path: "src/try.html",
    //   },
    //   {
    //     filename: "avatar.png",
    //     path: "public/avatar.png",
    //     cid: "avatar.png", //same cid value as in the html img src
    //   },
    // ],

    // text: "Hello world?", // plain text body

    html: `<!DOCTYPE HTML
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <title></title>

    <style type="text/css">
        @media only screen and (min-width: 620px) {
            .u-row {
                width: 600px !important;
            }

            .u-row .u-col {
                vertical-align: top;
            }

            .u-row .u-col-33p33 {
                width: 199.98px !important;
            }

            .u-row .u-col-50 {
                width: 300px !important;
            }

            .u-row .u-col-100 {
                width: 600px !important;
            }

        }

        @media (max-width: 620px) {
            .u-row-container {
                max-width: 100% !important;
                padding-left: 0px !important;
                padding-right: 0px !important;
            }

            .u-row .u-col {
                min-width: 320px !important;
                max-width: 100% !important;
                display: block !important;
            }

            .u-row {
                width: calc(100% - 40px) !important;
            }

            .u-col {
                width: 100% !important;
            }

            .u-col>div {
                margin: 0 auto;
            }
        }

        body {
            margin: 0;
            padding: 0;
        }

        table,
        tr,
        td {
            vertical-align: top;
            border-collapse: collapse;
        }

        p {
            margin: 0;
        }

        .ie-container table,
        .mso-container table {
            table-layout: fixed;
        }

        * {
            line-height: inherit;
        }

        a[x-apple-data-detectors='true'] {
            color: inherit !important;
            text-decoration: none !important;
        }

        table,
        td {
            color: #000000;
        }

        a {
            color: #0000ee;
            text-decoration: underline;
        }

        @media (max-width: 480px) {
            #u_content_image_1 .v-src-width {
                width: auto !important;
            }

            #u_content_image_1 .v-src-max-width {
                max-width: 58% !important;
            }

            #u_content_text_8 .v-text-align {
                text-align: center !important;
            }

            #u_content_text_9 .v-text-align {
                text-align: center !important;
            }

            #u_content_button_4 .v-text-align {
                text-align: center !important;
            }
        }
    </style>



    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet"
        type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700&display=swap" rel="stylesheet"
        type="text/css">
    <!--<![endif]-->

</head>

<body class="clean-body u_body"
    style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e8d4bb;color: #000000">
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->
    <table
        style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e8d4bb;width:100%"
        cellpadding="0" cellspacing="0">
        <tbody>
            <tr style="vertical-align: top">
                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e8d4bb;"><![endif]-->


                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <!--<![endif]-->

                                            <table style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:5px;font-family:'Montserrat',sans-serif;"
                                                            align="left">

                                                            <table height="0px" align="center" border="0"
                                                                cellpadding="0" cellspacing="0" width="100%"
                                                                style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                <tbody>
                                                                    <tr style="vertical-align: top">
                                                                        <td
                                                                            style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                            <span>&#160;</span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>



                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="200" style="width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                <div class="u-col u-col-33p33"
                                    style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <!--<![endif]-->

                                            <table style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:25px 10px 10px;font-family:'Montserrat',sans-serif;"
                                                            align="left">

                                                            <div class="menu" style="text-align:center">
                                                                <!--[if (mso)|(IE)]><table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center"><tr><![endif]-->

                                                                <!--[if (mso)|(IE)]><td style="padding:5px 15px"><![endif]-->

                                                                <span
                                                                    style="padding:5px 15px;display:inline-block;color:#444444;font-family:'Montserrat',sans-serif;font-size:14px">
                                                                    NEWS
                                                                </span>

                                                                <!--[if (mso)|(IE)]></td><![endif]-->


                                                                <!--[if (mso)|(IE)]><td style="padding:5px 15px"><![endif]-->

                                                                <span
                                                                    style="padding:5px 15px;display:inline-block;color:#444444;font-family:'Montserrat',sans-serif;font-size:14px">
                                                                    SERVICE
                                                                </span>

                                                                <!--[if (mso)|(IE)]></td><![endif]-->


                                                                <!--[if (mso)|(IE)]></tr></table><![endif]-->
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]><td align="center" width="200" style="width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                <div class="u-col u-col-33p33"
                                    style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <!--<![endif]-->

                                            <table id="u_content_image_1" style="font-family:'Montserrat',sans-serif;"
                                                role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                                border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px;font-family:'Montserrat',sans-serif;"
                                                            align="left">

                                                            <table width="100%" cellpadding="0" cellspacing="0"
                                                                border="0">
                                                                <tr>
                                                                    <td class="v-text-align"
                                                                        style="padding-right: 0px;padding-left: 0px;"
                                                                        align="center">

                                                                        <img align="center" border="0"
                                                                            src="https://cdn.templates.unlayer.com/assets/1606906849237-logo.png"
                                                                            alt="Image" title="Image"
                                                                            style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 77%;max-width: 138.6px;"
                                                                            width="138.6"
                                                                            class="v-src-width v-src-max-width" />

                                                                    </td>
                                                                </tr>
                                                            </table>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]><td align="center" width="200" style="width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                <div class="u-col u-col-33p33"
                                    style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <!--<![endif]-->

                                            <table style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:25px 10px 30px;font-family:'Montserrat',sans-serif;"
                                                            align="left">

                                                            <div class="menu" style="text-align:center">
                                                                <!--[if (mso)|(IE)]><table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center"><tr><![endif]-->

                                                                <!--[if (mso)|(IE)]><td style="padding:5px 15px"><![endif]-->

                                                                <span
                                                                    style="padding:5px 15px;display:inline-block;color:#444444;font-family:'Montserrat',sans-serif;font-size:14px">
                                                                    ABOUT
                                                                </span>

                                                                <!--[if (mso)|(IE)]></td><![endif]-->


                                                                <!--[if (mso)|(IE)]><td style="padding:5px 15px"><![endif]-->

                                                                <span
                                                                    style="padding:5px 15px;display:inline-block;color:#444444;font-family:'Montserrat',sans-serif;font-size:14px">
                                                                    CONTACT
                                                                </span>

                                                                <!--[if (mso)|(IE)]></td><![endif]-->


                                                                <!--[if (mso)|(IE)]></tr></table><![endif]-->
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>



                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-image: url('https://cdn.templates.unlayer.com/assets/1606924485372-1.jpg');background-repeat: no-repeat;background-position: center top;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-image: url('https://cdn.templates.unlayer.com/assets/1606924485372-1.jpg');background-repeat: no-repeat;background-position: center top;background-color: transparent;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <!--<![endif]-->

                                            <table style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:150px 10px 10px;font-family:'Montserrat',sans-serif;"
                                                            align="left">

                                                            <table height="0px" align="center" border="0"
                                                                cellpadding="0" cellspacing="0" width="100%"
                                                                style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                <tbody>
                                                                    <tr style="vertical-align: top">
                                                                        <td
                                                                            style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                            <span>&#160;</span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;"
                                                            align="left">

                                                            <div class="v-text-align"
                                                                style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 140%;"><span
                                                                        style="font-family: Montserrat, sans-serif; font-size: 14px; line-height: 19.6px;"><strong><span
                                                                                style="font-size: 44px; line-height: 61.6px;">NEW
                                                                                ARRIVAL</span></strong></span></p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 50px;font-family:'Montserrat',sans-serif;"
                                                            align="left">

                                                            <div class="v-text-align" align="center">
                                                                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:'Montserrat',sans-serif;"><tr><td class="v-text-align" style="font-family:'Montserrat',sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:40px; v-text-anchor:middle; width:134px;" arcsize="0%" stroke="f" fillcolor="#ffffff"><w:anchorlock/><center style="color:#463a41;font-family:'Montserrat',sans-serif;"><![endif]-->
                                                                <a href="" target="_blank"
                                                                    style="box-sizing: border-box;display: inline-block;font-family:'Montserrat',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #463a41; background-color: #ffffff; border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
                                                                    <span
                                                                        style="display:block;padding:12px 22px;line-height:120%;"><strong><span
                                                                                style="font-size: 14px; line-height: 16.8px;">VIEW
                                                                                MORE</span></strong></span>
                                                                </a>
                                                                <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>



                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <!--<![endif]-->

                                            <table style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px;font-family:'Montserrat',sans-serif;"
                                                            align="left">

                                                            <div class="v-text-align"
                                                                style="line-height: 140%; text-align: center; word-wrap: break-word;">
                                                                <p style="line-height: 140%; font-size: 14px;"><span
                                                                        style="line-height: 33.6px; font-size: 24px; font-family: 'Playfair Display', serif;"><span
                                                                            style="line-height: 33.6px; font-size: 24px;"><strong>Purchasing
                                                                                Focal Just got
                                                                                easier</strong></span></span></p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 40px;font-family:'Montserrat',sans-serif;"
                                                            align="left">

                                                            <div class="v-text-align"
                                                                style="line-height: 140%; text-align: center; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 140%;"><span
                                                                        style="font-size: 14px; line-height: 19.6px;">Lorem
                                                                        ipsum dolor sit amet, </span></p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>



                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                <div class="u-col u-col-50"
                                    style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <!--<![endif]-->

                                            <table style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;"
                                                            align="left">

                                                            <table width="100%" cellpadding="0" cellspacing="0"
                                                                border="0">
                                                                <tr>
                                                                    <td class="v-text-align"
                                                                        style="padding-right: 0px;padding-left: 0px;"
                                                                        align="center">

                                                                        <img align="center" border="0"
                                                                            src="https://cdn.templates.unlayer.com/assets/1606934810497-02.png"
                                                                            alt="Image" title="Image"
                                                                            style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 280px;"
                                                                            width="280"
                                                                            class="v-src-width v-src-max-width" />

                                                                    </td>
                                                                </tr>
                                                            </table>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 0px;font-family:'Montserrat',sans-serif;"
                                                            align="left">

                                                            <div class="v-text-align"
                                                                style="line-height: 140%; text-align: center; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 140%;"><span
                                                                        style="font-size: 16px; line-height: 22.4px;"><strong><span
                                                                                style="line-height: 22.4px; font-size: 16px;">Ray-Ban</span></strong></span>
                                                                </p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;"
                                                            align="left">

                                                            <div class="v-text-align"
                                                                style="line-height: 140%; text-align: center; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 140%;"><span
                                                                        style="font-size: 16px; line-height: 22.4px;"><strong><span
                                                                                style="line-height: 22.4px; font-size: 16px;">$20</span></strong></span>
                                                                </p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;"
                                                            align="left">

                                                            <div class="v-text-align" align="center">
                                                                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:'Montserrat',sans-serif;"><tr><td class="v-text-align" style="font-family:'Montserrat',sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:36px; v-text-anchor:middle; width:104px;" arcsize="0%" stroke="f" fillcolor="#262425"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Montserrat',sans-serif;"><![endif]-->
                                                                <a href="" target="_blank"
                                                                    style="box-sizing: border-box;display: inline-block;font-family:'Montserrat',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #262425; border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
                                                                    <span
                                                                        style="display:block;padding:10px 20px;line-height:120%;"><span
                                                                            style="font-size: 14px; line-height: 16.8px;">Buy
                                                                            Now</span></span>
                                                                </a>
                                                                <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                <div class="u-col u-col-50"
                                    style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <!--<![endif]-->

                                            <table style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;"
                                                            align="left">

                                                            <table width="100%" cellpadding="0" cellspacing="0"
                                                                border="0">
                                                                <tr>
                                                                    <td class="v-text-align"
                                                                        style="padding-right: 0px;padding-left: 0px;"
                                                                        align="center">

                                                                        <img align="center" border="0"
                                                                            src="https://cdn.templates.unlayer.com/assets/1606932761674-2.jpg"
                                                                            alt="Image" title="Image"
                                                                            style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 280px;"
                                                                            width="280"
                                                                            class="v-src-width v-src-max-width" />

                                                                    </td>
                                                                </tr>
                                                            </table>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 0px;font-family:'Montserrat',sans-serif;"
                                                            align="left">

                                                            <div class="v-text-align"
                                                                style="line-height: 140%; text-align: center; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 140%;"><span
                                                                        style="font-size: 16px; line-height: 22.4px;"><strong><span
                                                                                style="line-height: 22.4px; font-size: 16px;">Ray-Ban</span></strong></span>
                                                                </p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;"
                                                            align="left">

                                                            <div class="v-text-align"
                                                                style="line-height: 140%; text-align: center; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 140%;"><span
                                                                        style="font-size: 16px; line-height: 22.4px;"><strong><span
                                                                                style="line-height: 22.4px; font-size: 16px;">$25</span></strong></span>
                                                                </p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;"
                                                            align="left">

                                                            <div class="v-text-align" align="center">
                                                                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:'Montserrat',sans-serif;"><tr><td class="v-text-align" style="font-family:'Montserrat',sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:36px; v-text-anchor:middle; width:104px;" arcsize="0%" stroke="f" fillcolor="#262425"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Montserrat',sans-serif;"><![endif]-->
                                                                <a href="" target="_blank"
                                                                    style="box-sizing: border-box;display: inline-block;font-family:'Montserrat',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #262425; border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
                                                                    <span
                                                                        style="display:block;padding:10px 20px;line-height:120%;"><span
                                                                            style="font-size: 14px; line-height: 16.8px;">Buy
                                                                            Now</span></span>
                                                                </a>
                                                                <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>



                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <!--<![endif]-->

                                            <table style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:30px 30px 40px;font-family:'Montserrat',sans-serif;"
                                                            align="left">

                                                            <div class="v-text-align"
                                                                style="line-height: 160%; text-align: center; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 160%;"><span
                                                                        style="font-size: 14px; line-height: 22.4px;">Lorem
                                                                        ipsum dolor sit amet, consectetur adipiscing
                                                                        elit, sed do eiusmod tempor incididunt ut labore
                                                                        et dolore magna aliqua. </span></p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>



                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-image: url('https://cdn.templates.unlayer.com/assets/1606937518713-ASASS.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-image: url('https://cdn.templates.unlayer.com/assets/1606937518713-ASASS.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <!--<![endif]-->

                                            <table id="u_content_text_8" style="font-family:'Montserrat',sans-serif;"
                                                role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                                border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:60px 30px 0px;font-family:'Montserrat',sans-serif;"
                                                            align="left">

                                                            <div class="v-text-align"
                                                                style="color: #ffffff; line-height: 120%; text-align: left; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 120%;"><span
                                                                        style="font-size: 32px; line-height: 38.4px;"><strong><span
                                                                                style="line-height: 38.4px; font-size: 32px;">ABOUT
                                                                                OUR</span></strong></span></p>
                                                                <p style="font-size: 14px; line-height: 120%;"><span
                                                                        style="font-size: 32px; line-height: 38.4px;"><strong><span
                                                                                style="line-height: 38.4px; font-size: 32px;">
                                                                                PRODUCT</span></strong></span></p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table id="u_content_text_9" style="font-family:'Montserrat',sans-serif;"
                                                role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                                border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:22px 30px 10px;font-family:'Montserrat',sans-serif;"
                                                            align="left">

                                                            <div class="v-text-align"
                                                                style="color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 140%;"><span
                                                                        style="font-size: 14px; line-height: 19.6px;">Lorem
                                                                        ipsum dolor sit amet, consectetur </span></p>
                                                                <p style="font-size: 14px; line-height: 140%;"><span
                                                                        style="font-size: 14px; line-height: 19.6px;">adipiscing
                                                                        elit, sed do eiusmod tempor </span></p>
                                                                <p style="font-size: 14px; line-height: 140%;"><span
                                                                        style="font-size: 14px; line-height: 19.6px;">incididunt
                                                                        ut labore et dolore magna </span></p>
                                                                <p style="font-size: 14px; line-height: 140%;"><span
                                                                        style="font-size: 14px; line-height: 19.6px;"><span
                                                                            style="line-height: 19.6px; font-size: 14px;">aliqua.</span><span
                                                                            style="line-height: 19.6px; font-size: 14px;">enim
                                                                            ad minim veniam, quis nostrud </span></span>
                                                                </p>
                                                                <p style="font-size: 14px; line-height: 140%;"><span
                                                                        style="font-size: 14px; line-height: 19.6px;"><span
                                                                            style="line-height: 19.6px; font-size: 14px;">exercitation
                                                                            ullamco</span><span
                                                                            style="line-height: 19.6px; font-size: 14px;">&nbsp;</span></span>
                                                                </p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table id="u_content_button_4" style="font-family:'Montserrat',sans-serif;"
                                                role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                                border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 30px 40px;font-family:'Montserrat',sans-serif;"
                                                            align="left">

                                                            <div class="v-text-align" align="left">
                                                                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:'Montserrat',sans-serif;"><tr><td class="v-text-align" style="font-family:'Montserrat',sans-serif;" align="left"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:40px; v-text-anchor:middle; width:139px;" arcsize="0%" stroke="f" fillcolor="#ffffff"><w:anchorlock/><center style="color:#252324;font-family:'Montserrat',sans-serif;"><![endif]-->
                                                                <a href="" target="_blank"
                                                                    style="box-sizing: border-box;display: inline-block;font-family:'Montserrat',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #252324; background-color: #ffffff; border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
                                                                    <span
                                                                        style="display:block;padding:12px 25px;line-height:120%;"><strong><span
                                                                                style="font-size: 14px; line-height: 16.8px;">VIEW
                                                                                MORE</span></strong></span>
                                                                </a>
                                                                <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>



                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <!--<![endif]-->

                                            <table style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:15px;font-family:'Montserrat',sans-serif;"
                                                            align="left">

                                                            <table height="0px" align="center" border="0"
                                                                cellpadding="0" cellspacing="0" width="100%"
                                                                style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                <tbody>
                                                                    <tr style="vertical-align: top">
                                                                        <td
                                                                            style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                            <span>&#160;</span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>



                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #d4ae7f;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #d4ae7f;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <!--<![endif]-->

                                            <table style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px 10px;font-family:'Montserrat',sans-serif;"
                                                            align="left">

                                                            <div class="v-text-align"
                                                                style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
                                                                <p style="font-size: 14px; line-height: 140%;"><span
                                                                        style="font-size: 14px; line-height: 19.6px; font-family: Montserrat, sans-serif;"><strong><span
                                                                                style="line-height: 19.6px; font-size: 14px;">FOLLOW&nbsp;
                                                                                US&nbsp; ON</span></strong></span></p>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 20px;font-family:'Montserrat',sans-serif;"
                                                            align="left">

                                                            <div align="center">
                                                                <div style="display: table; max-width:125px;">
                                                                    <!--[if (mso)|(IE)]><table width="125" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:125px;"><tr><![endif]-->


                                                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 10px;" valign="top"><![endif]-->
                                                                    <table align="left" border="0" cellspacing="0"
                                                                        cellpadding="0" width="32" height="32"
                                                                        style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
                                                                        <tbody>
                                                                            <tr style="vertical-align: top">
                                                                                <td align="left" valign="middle"
                                                                                    style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                    <a href="https://facebook.com/"
                                                                                        title="Facebook"
                                                                                        target="_blank">
                                                                                        <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/facebook.png"
                                                                                            alt="Facebook"
                                                                                            title="Facebook" width="32"
                                                                                            style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                    </a>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <!--[if (mso)|(IE)]></td><![endif]-->

                                                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 10px;" valign="top"><![endif]-->
                                                                    <table align="left" border="0" cellspacing="0"
                                                                        cellpadding="0" width="32" height="32"
                                                                        style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
                                                                        <tbody>
                                                                            <tr style="vertical-align: top">
                                                                                <td align="left" valign="middle"
                                                                                    style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                    <a href="https://instagram.com/"
                                                                                        title="Instagram"
                                                                                        target="_blank">
                                                                                        <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/instagram.png"
                                                                                            alt="Instagram"
                                                                                            title="Instagram" width="32"
                                                                                            style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                    </a>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <!--[if (mso)|(IE)]></td><![endif]-->

                                                                    <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
                                                                    <table align="left" border="0" cellspacing="0"
                                                                        cellpadding="0" width="32" height="32"
                                                                        style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
                                                                        <tbody>
                                                                            <tr style="vertical-align: top">
                                                                                <td align="left" valign="middle"
                                                                                    style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                    <a href="https://twitter.com/"
                                                                                        title="Twitter" target="_blank">
                                                                                        <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/twitter.png"
                                                                                            alt="Twitter"
                                                                                            title="Twitter" width="32"
                                                                                            style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                    </a>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <!--[if (mso)|(IE)]></td><![endif]-->


                                                                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                                                </div>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>



                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                            style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

                                <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                                <div class="u-col u-col-100"
                                    style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                    <div style="width: 100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                            <!--<![endif]-->

                                            <table style="font-family:'Montserrat',sans-serif;" role="presentation"
                                                cellpadding="0" cellspacing="0" width="100%" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;"
                                                            align="left">

                                                            <table height="0px" align="center" border="0"
                                                                cellpadding="0" cellspacing="0" width="100%"
                                                                style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                <tbody>
                                                                    <tr style="vertical-align: top">
                                                                        <td
                                                                            style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                            <span>&#160;</span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>

                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>


                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </td>
            </tr>
        </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
</body>

</html>`, // html body
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
