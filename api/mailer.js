"use strict";
const nodemailer = require("nodemailer");
const google = require("googleapis");
require("dotenv/config");

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const refreshToken = process.env.REFRESH_TOKEN;
const redirectURI = process.env.REDIRECT_URI;
const key = process.env.API_KEY;

const OAuth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectURI
);

OAuth2Client.setCredentials({
  refreshToken,
});

const accessToken = oauth2Client.getAccessToken();

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  logger: true,
  debug: true,
  auth: {
    type: "OAuth2",
    user: "davimatana.promoter@gmail.com",
    clientId,
    clientSecret,
    refreshToken,
    accessToken,
    key,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(req) {
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "davimatana.promoter@gmail.com",
    to: "matananh@gmail.com",
    //to: `${req.body.professional}`,
    // bcc: 'joao@hcode.com.br',
    subject: "Contato via Site: Gomes Espaço Multi-diciplinar",
    html: `
    <h1 style='font-size:1.5em; text-align:center;'>Contato</h1>
    <p>
    <strong>Nome:</strong> ${req.body.nameFull}<br/>
    <strong>E-mail:</strong> ${req.body.email}<br/>
    <strong>Telefone:</strong> ${req.body.phone} <br/>
    <strong>Mensagem:</strong> ${req.body.message}<br/> 
    </p>
    `,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
